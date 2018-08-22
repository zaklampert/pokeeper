import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { cashify } from '../helpers/formatting.js';
import moment from 'moment';

export default class GameSummary extends React.Component {
  _playerBalance(player){
    const { game } = this.props;
    const buys = player.buysInGame(this.props.game._id).fetch()
    console.log(buys)
    const cashes = player.cashesInGame(this.props.game._id).fetch()
    const totalBuys = (buys && buys.length > 0) ? buys.reduce((prev, curr)=>{
      return prev + curr.amount;
    }, 0) : 0;
    const totalCashes = (cashes && cashes.length > 0) ? cashes.reduce((prev, curr)=>{
      return prev + curr.amount;
    }, 0) : 0;

    return (totalBuys * -1) + totalCashes
  }
  render() {
    const {players, game} = this.props;
    console.log(players);
    let PlayersInGame;
    if(!players || !players.length) {
      PlayersInGame = (
        <div>No Players yet</div>
      )
    } else {
      PlayersInGame = players.map(player=>(
        <div key={player._id}>
          {player.name}: {this._playerBalance(player)}
        </div>

      ))
    }
    return (
      <div>
      Game date: {moment(game.createdAt).calendar()}
      {PlayersInGame}
      </div>
    )
  }
}
