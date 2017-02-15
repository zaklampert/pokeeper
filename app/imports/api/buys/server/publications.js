/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Buys } from '../buys.js';

Meteor.publish('buys.inGame', function buysInGame(params) {
  check(params, Object);
  return Buys.find({
    gameId: params.gameId,
  }, {
    fields: Buys.publicFields,
  });
});
