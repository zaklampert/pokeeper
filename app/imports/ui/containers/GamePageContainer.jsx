import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../../api/games/games.js';
import { Players } from '../../api/players/players.js';
import GameLayout from '../layouts/GameLayout.jsx';

const GamePageContainer = createContainer(({ params: { id } }) => {
  const buysHandle = Meteor.subscribe('buys.inGame', { gameId: id });
  const cashesHandle = Meteor.subscribe('cashes.inGame', { gameId: id });
  const playersHandle = Meteor.subscribe('players.inGameAndFriends', { gameId: id });
  const gameHandle = Meteor.subscribe('game.public', id);
  const loading = !(buysHandle.ready() && playersHandle.ready() && gameHandle.ready() );
  const game = Games.findOne(id);
  console.log(game)
  // const friends = Players.find();
  const gameExists = !loading && !!game;
  return {
    loading,
    game,
    gameExists,
    buys: gameExists ? game.buys().fetch() : [],
    cashes: gameExists ? game.cashes().fetch() : [],
    players: gameExists ? game.playersInGame().fetch() : [],
    friends: gameExists ? game.friendsNotInGame().fetch() : [],
  };
}, GameLayout);

export default GamePageContainer;
