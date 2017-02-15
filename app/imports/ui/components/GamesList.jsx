/* global alert */

import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/games/methods.js';
import moment from 'moment';

export default class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.createNewGame = this.createNewGame.bind(this);
  }

  createNewGame() {
    const { router } = this.context;
    const gameId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        console.log(err);
        // alert(i18n.__('components.listList.newListError'));
      }
    });
    router.push(`/games/${gameId}`);
  }

  render() {
    const { games } = this.props;
    return (
      <div className="list-todos">
        <a className="link-list-new" onClick={this.createNewGame}>
          <span className="icon-plus" />
          New Game
        </a>
        {games.map(game => {
          const date = moment(game.createdAt).calendar();
          return(
            <Link
              to={`/games/${game._id}`}
              key={game._id}
              // title={list.name}
              className="list-todo"
              activeClassName="active"
            >
              {/* {game.userId
                ? <span className="icon-lock" />
                : null}
              {list.incompleteCount
                ? <span className="count-list">{list.incompleteCount}</span>
                : null} */}
              {date}
            </Link>
          )
        })}
      </div>
    );
  }
}

GamesList.propTypes = {
  games: React.PropTypes.array,
};

GamesList.contextTypes = {
  router: React.PropTypes.object,
};
