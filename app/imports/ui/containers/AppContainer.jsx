import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../../api/games/games.js';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const gamesHandle = Meteor.subscribe('games.private');
  return {
    user: Meteor.user(),
    loading: !gamesHandle.ready(),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    games: Games.find({},{sort: {createdAt: -1}}).fetch(),
  };
}, App);
