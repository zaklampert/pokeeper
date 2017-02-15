import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
// import i18n from 'meteor/universe:i18n';
import { Buys } from '../buys/buys.js';
import { Cashes } from '../cashes/cashes.js';
import { Players } from '../players/players.js';

class GamesCollection extends Mongo.Collection {
  insert(callback) {
    const game = {
      createdAt: new Date(),
      owner: Meteor.userId(),
      players: []
    };

    return super.insert(game, callback);
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  remove(selector, callback) {

    return super.remove(selector, callback);
  }
}

export const Games = new GamesCollection('Games');

// Deny all client-side updates since we will be using methods to manage this collection
Games.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Games.schema = new SimpleSchema({
  description: { type: String, optional: true },
  balance: { type: Number, optional: true, decimal: true },
  createdAt: {type: Date, denyUpdate: true},
  owner: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  players: { type: [String], optional: false}
});

Games.attachSchema(Games.schema);

// This represents the keys from Games objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Games.publicFields = {
  // name: 1,
  createdAt: 1,
  balance: 1,
  description: 1,
  players: 1
};

Factory.define('game', Games, {});

Games.helpers({
  buys() {
    return Buys.find({ gameId: this._id }, { sort: { createdAt: -1 } });
  },
  cashes() {
    return Cashes.find({gameId: this._id}, {sort: {createdAt: -1}});
  },
  // NOTE: you can't call a helper function the name of an object key, duh.
  playersInGame() {
    return Players.find({_id: {$in: this.players}});
  }
});
