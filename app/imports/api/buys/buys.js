import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import numeral from 'numeral';
import { Games } from '../games/games.js';

class BuysCollection extends Mongo.Collection {
  insert(buy, callback) {
    const doc = {
      createdAt: new Date(),
      playerId: buy.playerId,
      amount: numeral(buy.amount).value(),
      method: buy.method,
      gameId: buy.gameId
    }

    const result = super.insert(doc, callback)

    //keep balance up to date for reactivity.
    const game = Games.findOne({_id: buy.gameId});
    if (game.balance) {
      const newAmount = numeral(game.balance).value() + numeral(buy.amount).value();
      Games.update({_id: buy.gameId}, {$set: {balance: newAmount}});
    } else {
      Games.update({_id: buy.gameId}, {$set: {balance: numeral(buy.amount).value()}});
    }

    return result
  }
  remove(selector, callback) {

    return super.remove(selector, callback);
  }
}

export const Buys = new BuysCollection('Buys');

// Deny all client-side updates since we will be using methods to manage this collection
Buys.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Buys.schema = new SimpleSchema({
  amount: { type: Number, decimal: true },
  createdAt: {type: Date, denyUpdate: true},
  method: {type: String},
  playerId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  gameId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
});

Buys.attachSchema(Buys.schema);

// This represents the keys from Buys objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Buys.publicFields = {
  createdAt: 1,
  amount: 1,
  playerId: 1,
  method: 1,
  gameId: 1,
};

Factory.define('buy', Buys, {});

Buys.helpers({
  game(){
    return Games.findOne({_id: this.gameId});
  }
});
