import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import numeral from 'numeral';
// import i18n from 'meteor/universe:i18n';
import { Games } from '../games/games.js';
// import { Cashes } from '../sells/sells.js';

class CashesCollection extends Mongo.Collection {
  insert(cash, callback) {
    const doc = {
      createdAt: new Date(),
      playerId: cash.playerId,
      amount: cash.amount,
      method: cash.method,
      gameId: cash.gameId
    }
    const result = super.insert(doc, callback)
    //keep balance up to date for reactivity.
    const game = Games.findOne({_id: cash.gameId});
    if (game.balance) {
      const newAmount = numeral(game.balance).value() - numeral(cash.amount).value();
      Games.update({_id: cash.gameId}, {$set: {balance: newAmount}});
    } else {
      Games.update({_id: cash.gameId}, {$set: {balance: numeral(cash.amount).value()}});
    }
    return result;
  }
  remove(selector, callback) {

    return super.remove(selector, callback);
  }
}

export const Cashes = new CashesCollection('Cashes');

// Deny all client-side updates since we will be using methods to manage this collection
Cashes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Cashes.schema = new SimpleSchema({
  amount: { type: Number, decimal: true},
  method: {type: String},
  createdAt: {type: Date, denyUpdate: true},
  playerId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  gameId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
});

Cashes.attachSchema(Cashes.schema);

// This represents the keys from Cashes objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Cashes.publicFields = {
  // name: 1,
  createdAt: 1,
  amount: 1,
  playerId: 1,
  method: 1,
  gameId: 1,
};

Factory.define('sell', Cashes, {});

Cashes.helpers({
  game(){
    return Games.findOne({_id: this.gameId});
  }
});
