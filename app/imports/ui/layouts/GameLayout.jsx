import React from 'react';
import i18n from 'meteor/universe:i18n';
import numeral from 'numeral';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';


import IconMonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
import IconShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import IconInsertChart from 'material-ui/svg-icons/editor/insert-chart';

import BaseComponent from '../components/BaseComponent.jsx';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

import BuysAddBuy from '../components/BuysAddBuy.jsx';
import CashesCashPlayer from '../components/CashesCashPlayer';

import Players from '../../api/players/players.js';

const summaryIcon = <IconInsertChart />;
const cashIcon =  <IconMonetizationOn />;
const buyIcon = <IconShoppingBasket />;

import GameSummary from '../pages/GameSummary';

import {cashify} from '../helpers/formatting';

export default class GamePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 'summary',
      selectedIndex: 0,
    }
    this.onEditingChange = this.onEditingChange.bind(this);
    this._goTo = this._goTo.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editingTodo: editing ? id : null,
    });
  }

  _goTo(index){
    this.setState({
      selectedIndex: index
    })
  }


  render() {
    const { game, gameExists, loading, buys, players, children } = this.props;


    if (!gameExists) {
      return <NotFoundPage />;
    }

    return(
      <div style={{padding: '30px', margin:'40px 0'}}>
      <h1>Game Balance:   {(game.balance) ? cashify(game.balance) : null}</h1>
        {(()=>{
          switch(this.state.selectedIndex){
            case 0:
            default:
              return <GameSummary game={game} players={players}/>
              break;
            case 1:
              return <BuysAddBuy game={game} players={players}/>
              break;
            case 2:
              return <CashesCashPlayer game={game} players={players}/>
              break;
          }
        })()}

        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{
          position: 'fixed',
          bottom: '0',
          zIndex: '2',
          background: '#f9f9f9',
          left: '0',
          width: '100%'
        }}>
          <BottomNavigationItem
            label="Summary"
            icon={summaryIcon}
            onTouchTap={() => this._goTo(0)}
          />
          <BottomNavigationItem
            label="Buy"
            icon={buyIcon}
            onTouchTap={() => this._goTo(1)}
          />
          <BottomNavigationItem
            label="Cash"
            icon={cashIcon}
            onTouchTap={() => this._goTo(2)}
          />
        </BottomNavigation>
      </div>
    )

  }
}


GamePage.contextTypes = {
  router: React.PropTypes.object,
};

GamePage.propTypes = {
  game: React.PropTypes.object,
  buys: React.PropTypes.array,
  sells: React.PropTypes.array,
  players: React.PropTypes.array,
  loading: React.PropTypes.bool,
  gameExists: React.PropTypes.bool,
};
