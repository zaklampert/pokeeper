import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
// import i18n from 'meteor/universe:i18n';
import { Games } from '../games/games.js';
import { Buys } from '../buys/buys.js';
import { Cashes } from '../cashes/cashes.js';

class PlayersCollection extends Mongo.Collection {
  insert(player, callback) {
    const doc = {
      createdAt: new Date(),
      name: player.name,
      userId: player.userId || null
    }

    return super.insert(doc, callback);
    // //we want to add the player to the current game on insertdb.
    // Games.update({_id: player.gameId}, {$addToSet: {players: result}})
    //
    // //we also want to add the player to the current user's friends list
    // Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {'profile.friends': result}});
    //
    // return callback(result);

  }
  remove(selector, callback) {

    return super.remove(selector, callback);
  }
}

export const Players = new PlayersCollection('Players');

// Deny all client-side updates since we will be using methods to manage this collection
Players.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Players.schema = new SimpleSchema({
  userId: {  type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  name: {type: String, optional: false},
  createdAt: {type: Date}
});

Players.attachSchema(Players.schema);

// This represents the keys from Players objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Players.publicFields = {
  // name: 1,
  name: 1,
};

Factory.define('player', Players, {});

Players.helpers({
  user(){
    return Meteor.users.findOne({_id: this.userId});
  },
  buysInGame(gameId) {
    return Buys.find({gameId, playerId: this._id});
  },
  cashesInGame(gameId) {
    return Cashes.find({gameId, playerId: this._id});
  }
});
