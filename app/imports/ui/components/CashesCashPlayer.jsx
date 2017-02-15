import React from 'react';
import { insert } from '../../api/cashes/methods'

export default class CashesCashPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null
    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const {game} = this.props;
    const amount = this.amount.value;
    const method = this.method.value;
    console.log(amount, method, game._id)
    if ( amount && method) {
      insert.call({
        player: (!this.state.player._id) ? this.state.player.name : this.state.player._id,
        amount,
        method,
        gameId: game._id
      }, () => {
        this.setState({
          player: null
        })
      })
    }

  }
  _renderCashForm(){
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input name="amount" ref={(c) => { this.amount = c; }} placeholder="amount" />
          <input name="method" ref={(c) => { this.method = c; }} placeholder="method" />
          <button type="submit">Cash!</button>
        </form>
        Or choose a different player:
      </div>

    )
  }
  render() {
    const { game } = this.props;
    const { player } = this.state;
    return (
      <div>
        <h1>Cash {(player) ? player.name : <span>a player</span>}</h1>
        {(player) ? this._renderCashForm() : null}
        {game.playersInGame().map(player=>(
          <div key={player._id} onClick={()=>this.setState({player})}  >
            {player.name}
          </div>
        ))}
      </div>
    )
  }
}
