/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Cashes } from '../cashes.js';

Meteor.publish('cashes.inGame', function cashesInGame(params) {
  check(params, Object);
  return Cashes.find({
    gameId: params.gameId,
  }, {
    fields: Cashes.publicFields,
  });
});
