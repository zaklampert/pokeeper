/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Players } from '../players.js';
import { Games } from '../../games/games.js';


Meteor.publishComposite('players.inGame', function playersInGame(params) {
  new SimpleSchema({
    gameId: { type: String },
  }).validate(params);

  const { gameId } = params;

  return {
    find() {
      const query = {
        _id: gameId,
        // $or: [{ userId: { $exists: false } }, { userId }],
      };

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        fields: { players: 1 },
      };

      return Games.find(query, options);
    },

    children: [{
      find(game) {
        return Players.find({ _id: { $in: game.players} }, { fields: Players.publicFields });
      },
    }],
  };
});
