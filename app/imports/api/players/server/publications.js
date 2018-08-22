/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Players } from '../players.js';
import { Games } from '../../games/games.js';


Meteor.publishComposite('players.inGameAndFriends', function playersInGame(params) {
  new SimpleSchema({
    gameId: { type: String },
  }).validate(params);

  const { gameId } = params;
  const user = Meteor.users.findOne({_id: this.userId });
  const friends = (user && user.profile) ? user.profile.friends : [];
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
    },
    {
      find(game) {
        console.log(friends);
        return Players.find({ _id: { $in: friends} }, { fields: Players.publicFields });
      },
    }],
  };
});
