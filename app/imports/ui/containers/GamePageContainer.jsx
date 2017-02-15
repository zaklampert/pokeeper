import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../../api/games/games.js';
import GameLayout from '../layouts/GameLayout.jsx';

const GamePageContainer = createContainer(({ params: { id } }) => {
  console.log(id);
  const buysHandle = Meteor.subscribe('buys.inGame', { gameId: id });
  const cashesHandle = Meteor.subscribe('cashes.inGame', { gameId: id });
  const playersHandle = Meteor.subscribe('players.inGame', { gameId: id });

  const loading = !(buysHandle.ready() && playersHandle.ready() );
  const game = Games.findOne(id);
  const gameExists = !loading && !!game;
  return {
    loading,
    game,
    gameExists,
    buys: gameExists ? game.buys().fetch() : [],
    cashes: gameExists ? game.cashes().fetch() : [],
    players: gameExists ? game.playersInGame().fetch() : [],
  };
}, GameLayout);

export default GamePageContainer;
