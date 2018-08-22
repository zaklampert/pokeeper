import React from 'react';
import { Link } from 'react-router'
import moment from 'moment'
import {insert} from '../../api/games/methods';


export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this._createNewGame = this._createNewGame.bind(this);
  }
  _createNewGame() {
    const { router } = this.context;
    const { onRequestChange } = this.props;

    const gameId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        console.log(err);
        // alert(i18n.__('components.listList.newListError'));
      }
    });
    router.push(`/games/${gameId}`);
    // onRequestChange(false);
  }
  render() {
    const { games } = this.props;
    return (
      <div>

        <div style={{
          background: '#ddd',
          padding: '10px',
          cursor: 'pointer',
          display: 'inline-block'
        }}
        onClick={this._createNewGame}>Start a new game</div> 
        <br/>

        Your games:<br/>
        {games.map(game=>{
       
          return (
            <Link to={`/games/${game._id}`}>
            <div style={{marginBotton: '10px', background: "#ccc",padding: '25px', display: 'inline-block'}} key={game._id}>
              Date: {moment(game.createdAt).calendar()} <br/>
              Balance: {game.balance} <br/>
              Players: {game.playersInGame().map(player => {
                console.log(player)
                return `${player.name},`
                })}<br/>
            </div>
            <br/>
            </Link>
          )
        })}

      </div>
    )
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object,
};
