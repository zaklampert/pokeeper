/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Games } from '../games.js';
import { Players } from '../../players/players.js';


Meteor.publishComposite('games.private', function gamesPrivate() {
  return {
    find() {
      return Games.find({
        owner: this.userId,
      }, {
        fields: Games.publicFields,
      }); 
    },
    children: [{
      find(game) {
        return Players.find({_id: {$in: game.players}}, { fields: Players.publicFields})
      }
    }]
  }
})

// Meteor.publish('games.private', function gamesPrivate() {
//   return Games.find({
//     owner: this.userId,
//   }, {
//     fields: Games.publicFields,
//   });
// });


Meteor.publish('game.public', function gamePublic(_id) {
  check(_id, String);
  return Games.find({
    _id,
  }, {
    fields: Games.publicFields,
  });
});
