import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import { Cashes } from './cashes.js';
import { Players } from '../players/players.js';
import { Games } from '../games/games.js';

const LIST_ID_ONLY = new SimpleSchema({
  listId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'cashes.insert',
  validate: new SimpleSchema({
    player: {
      type: String,
    },
    amount: {
      type: String,
    },
    method: {
      type: String,
    },
    gameId: {
      type: String,
    }
  }).validator(),
  run({player, amount, method, gameId}) {
    // let playerId;
    //
    // if (!Players.findOne({_id: player})){
    //    playerId = Players.insert({name: player})
    //    Games.update({_id: gameId}, {$addToSet: {players: playerId}});
    // } else {
    //   playerId = player;
    // }

    const cash = {
      playerId: player,
      amount,
      method,
      gameId
    }
    return Cashes.insert(cash);
  },
});

// export const makePrivate = new ValidatedMethod({
//   name: 'lists.makePrivate',
//   validate: LIST_ID_ONLY,
//   run({ listId }) {
//     if (!this.userId) {
//       throw new Meteor.Error('api.lists.makePrivate.notLoggedIn',
//         'Must be logged in to make private lists.');
//     }
//
//     const list = Lists.findOne(listId);
//
//     if (list.isLastPublicList()) {
//       throw new Meteor.Error('api.lists.makePrivate.lastPublicList',
//         'Cannot make the last public list private.');
//     }
//
//     Lists.update(listId, {
//       $set: { userId: this.userId },
//     });
//   },
// });
//
// export const makePublic = new ValidatedMethod({
//   name: 'lists.makePublic',
//   validate: LIST_ID_ONLY,
//   run({ listId }) {
//     if (!this.userId) {
//       throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
//         'Must be logged in.');
//     }
//
//     const list = Lists.findOne(listId);
//
//     if (!list.editableBy(this.userId)) {
//       throw new Meteor.Error('api.lists.makePublic.accessDenied',
//         'You don\'t have permission to edit this list.');
//     }
//
//     // XXX the security check above is not atomic, so in theory a race condition could
//     // result in exposing private data
//     Lists.update(listId, {
//       $unset: { userId: true },
//     });
//   },
// });
//
// export const updateName = new ValidatedMethod({
//   name: 'lists.updateName',
//   validate: new SimpleSchema({
//     listId: { type: String },
//     newName: { type: String },
//   }).validator(),
//   run({ listId, newName }) {
//     const list = Lists.findOne(listId);
//
//     if (!list.editableBy(this.userId)) {
//       throw new Meteor.Error('api.lists.updateName.accessDenied',
//         'You don\'t have permission to edit this list.');
//     }
//
//     // XXX the security check above is not atomic, so in theory a race condition could
//     // result in exposing private data
//
//     Lists.update(listId, {
//       $set: { name: newName },
//     });
//   },
// });
//
// export const remove = new ValidatedMethod({
//   name: 'lists.remove',
//   validate: LIST_ID_ONLY,
//   run({ listId }) {
//     const list = Lists.findOne(listId);
//
//     if (!list.editableBy(this.userId)) {
//       throw new Meteor.Error('api.lists.remove.accessDenied',
//         'You don\'t have permission to remove this list.');
//     }
//
//     // XXX the security check above is not atomic, so in theory a race condition could
//     // result in exposing private data
//
//     if (list.isLastPublicList()) {
//       throw new Meteor.Error('api.lists.remove.lastPublicList',
//         'Cannot delete the last public list.');
//     }
//
//     Lists.remove(listId);
//   },
// });

// Get list of all method names on Lists
const CASHES_METHODS = _.pluck([
  insert,
  // makePublic,
  // makePrivate,
  // updateName,
  // remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(CASHES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
