import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../../api/games/games.js';
import Welcome from '../pages/Welcome.jsx';

const DashboardContainer = createContainer(() => {
  // const gamesHandle = Meteor.subscribe('buys.inGame', { gameId: id });
  // const cashesHandle = Meteor.subscribe('cashes.inGame', { gameId: id });
  // const playersHandle = Meteor.subscribe('players.inGame', { gameId: id });
  const gamesHandle = Meteor.subscribe('games.public', { gameId: id });
  const loading = !(gamesHandle.ready());
  const games= Games.find({},{sort: {createdAt: -1}}).fetch();
  // const gameExists = !loading && !!game;
  return {
    games,
    loading
    // games,
  };
  },
Welcome);

export default WelcomeContainer;
