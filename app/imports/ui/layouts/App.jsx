import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import UserMenu from '../components/UserMenu.jsx';
import GamesList from '../components/GamesList.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import MainNavigation from '../components/MainNavigation';
import AuthPageSignIn from '../pages/AuthPageSignIn';
import IconButton from 'material-ui/IconButton';
import ActionMenu from 'material-ui/svg-icons/navigation/menu';


const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children, userId, location }) {
    // // redirect / to a list once lists are ready
    // if (!loading && !children ) {
    //   // const game = Lists.findOne();
    const { router } = this.context;
    if(location.pathname === "/") {
      if (!userId) {
        router.replace(`/welcome`);
      } else {
        router.replace(`/dashboard`);
      }
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();
  }

  render() {
    const { showConnectionIssue, signingUp } = this.state;
    const {
      user,
      connected,
      loading,
      games,
      menuOpen,
      children,
      location,
    } = this.props;

    // eslint-disable-next-line react/jsx-no-bind
    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <div id="container" className={menuOpen ? 'menu-open' : ''} style={{}}>

        {showConnectionIssue && !connected
          ? <ConnectionNotification />
          : null}
        <div className="content-overlay" onClick={closeMenu} />
        <div id="content-container">
            {loading
              ? <Loading key="loading" />
              : clonedChildren}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  games: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
