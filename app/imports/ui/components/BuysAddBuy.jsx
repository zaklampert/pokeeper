import React from 'react';
import { insert } from '../../api/buys/methods';

import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class BuysAddBuy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      player: null,
      amount: '',
      method: '',
    }

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAddNewPlayerFormSubmit = this._handleAddNewPlayerFormSubmit.bind(this);
    this._renderBuyForm = this._renderBuyForm.bind(this);


  }
  _handleSubmit(e) {
    (e && e.preventDefault) ? e.preventDefault() : null;
    const {amount, method} = this.state;
    const {game} = this.props;
    if ( this.state.player.name && amount && method ) {
      insert.call({
        player: (!this.state.player._id) ? this.state.player.name : this.state.player._id,
        amount,
        method,
        gameId: game._id
      }, (res)=>{
        console.log(res);
        this.setState({
          player: null,
          amount: '',
          method: '',
        })
      })
    }
  }
  _handleAddNewPlayerFormSubmit(e){
    ( e && e.preventDefault ) ? e.preventDefault() : null;
    const name = this.name.value;
    if( name ) {
      return this.setState({
          player: {
            name: this.name.value
          }
        })
    }
  }
  _renderBuyForm(){
    const { amount, method  } = this.state;
    return (
      <form onSubmit={this._handleSubmit}>
        <TextField
          hintText="Enter a buy amount"
          value={amount}
          floatingLabelText="Amount"
          onChange={(e, newValue) => {
            this.setState({
              amount: newValue
            })
          }}
         />

        <TextField
          hintText="Enter a method (i.e. paypal, cash)"
          value={method}
          floatingLabelText="Method"
          onChange={(e, newValue) => {
            this.setState({
              method: newValue
            })
          }}
         />
        <button type="submit">Add!</button>
        <button onClick={(e)=>{e.preventDefault(); this.setState({player: null})}}>
          Cancel
        </button>
      </form>
    )
  }

  render() {
    const { game, friends } = this.props;
    console.log(friends);
    const { player } = this.state;
    if (player) {
      return (
        <div>
          <h1>Add a buy for {player.name}</h1>
          {this._renderBuyForm()}
        </div>
      )
    }

    const dataSource = game.playersInGame().map(player=>{
      return {
        text: player.name,
        value: player
      }
    });

    const dataSourceConfig = {
      text: 'text',
      value: 'value'
    };
    return (
      <div>
        <h1>Add a buy!</h1>
          <AutoComplete
           hintText="Type anything"
           dataSource={dataSource}
           dataSourceConfig={dataSourceConfig}
           filter={AutoComplete.caseInsensitiveFilter}
           onNewRequest={
             (chosenRequest) => {
               (chosenRequest.value) ?
               this.setState({player: chosenRequest.value}) :
               this.setState({player: {name: chosenRequest}})
             }}
           floatingLabelText="Player"
           fullWidth={true}
         />
    
         <h2>Players In Game</h2>
         <div style={styles.wrapper}>
         {game.playersInGame().map(player=>(
           <Chip onTouchTap={()=>this.setState({player})} key={player._id} style={styles.chip}>
             {player.name}
           </Chip>
         ))}
         </div>

         {friends.length > 0 && <div>
            <h2>Friends from previous games</h2>
          <div style={styles.wrapper}>  
            {friends.map(player => (
              <Chip onTouchTap={()=>this.setState({player})} key={player._id} style={styles.chip}>
                {player.name}
              </Chip>
            ))}
          </div>
          </div>
         }
 

      </div>
    )
  }
}

export default BuysAddBuy;
