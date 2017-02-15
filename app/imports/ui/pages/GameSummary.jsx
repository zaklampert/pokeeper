import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { cashify } from '../helpers/formatting.js';
import moment from 'moment';

export default class GameSummary extends React.Component {

  render() {
    const {players, game} = this.props;

    let PlayersInGame;
    if(!players || !players.length) {
      PlayersInGame = (
        <div>No Players yet</div>
      )
    } else {
      PlayersInGame = players.map(player=>(
        <Card key={player._id} style={{marginBottom: '20px'}}>
        <CardHeader
          title={player.name}
        />
        <CardText>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                Buys
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>
                Amount
              </TableHeaderColumn>
              <TableHeaderColumn>
                Method
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
          {player.buysInGame(game._id).map(buy=>{
            return (
              <TableRow key={buy._id}>
                <TableRowColumn>{cashify(buy.amount)}</TableRowColumn>
                <TableRowColumn>{buy.method}</TableRowColumn>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                Cashes
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>
                Amount
              </TableHeaderColumn>
              <TableHeaderColumn>
                Method
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
          {player.cashesInGame(game._id).map(buy=>{
            return (
              <TableRow key={buy._id}>
                <TableRowColumn>{cashify(buy.amount)}</TableRowColumn>
                <TableRowColumn>{buy.method}</TableRowColumn>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
        </CardText>

        </Card>

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
