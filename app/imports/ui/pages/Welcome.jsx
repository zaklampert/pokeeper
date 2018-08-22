import React from 'react';
import { Link } from 'react-router';
import {lookup} from '../../api/games/methods';

export default class Welcome extends React.Component{
  constructor(props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
  }
  _handleSearch() {
    const { router } = this.context;
    const code = this.gameCode && this.gameCode.value;
    return code && lookup.call({code}, (err, res) => {
      if (err) {
        return alert(err.error)
      }
      router.push(`/games/${res}`);
    });
  }
  render() {
    return (
      <div>
        Join a game:
        <input placeholder="Enter game code." ref={(c)=> {this.gameCode = c;}}/>
        <button onClick={this._handleSearch}>Search for a game</button>
        <br/>
        or
        <br/>
        <Link to="/signin">log in</Link>or 
        <Link to="/join">create an account</Link>
      </div>
    )
  }
};


Welcome.contextTypes = {
  router: React.PropTypes.object,
};
