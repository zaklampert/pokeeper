import React from 'react';
import { Meteor } from 'meteor/meteor';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import {insert} from '../../api/games/methods';
import moment from 'moment';

export default class MainNavigation extends React.Component {
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
    onRequestChange(false);
  }
  render(){
    const {open, onRequestChange, games} = this.props;
    const { router } = this.context;

    const gameMenuItems = games.map(game=>{
      return (<MenuItem onTouchTap={()=>{
        onRequestChange(false);
        router.push(`/games/${game._id}`);
      }}>
      {moment(game.createdAt).calendar()}
      </MenuItem>)
    });

    return(
      <Drawer
        docked={false}
        open={open}
        onRequestChange={onRequestChange}
        >
          <MenuItem onTouchTap={()=>{
            onRequestChange(false);
            router.push(`/dashboard`);
          }}>
            Dashboard
          </MenuItem>
            <MenuItem onTouchTap={this._createNewGame}>
              New Game
            </MenuItem>
            <MenuItem primaryText={"My Games"}  rightIcon={<ArrowDropRight />} menuItems={gameMenuItems}>

            </MenuItem>

         <MenuItem onTouchTap={()=>{
           Meteor.logout();
           onRequestChange(false);
           router.push(`/welcome`);
         }}>Logout</MenuItem>
     </Drawer>
    )
  }
}
MainNavigation.contextTypes = {
  router: React.PropTypes.object,
};
