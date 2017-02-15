/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Games } from '../games.js';

Meteor.publish('games.private', function gamesPrivate() {
  return Games.find({
    owner: this.userId,
  }, {
    fields: Games.publicFields,
  });
});
