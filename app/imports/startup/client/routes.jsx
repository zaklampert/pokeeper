import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import GamePageContainer from '../../ui/containers/GamePageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import GameSummary from '../../ui/pages/GameSummary.jsx';
import BuysAddBuy from '../../ui/components/BuysAddBuy.jsx';
import CashesCashPlayer from '../../ui/components/CashesCashPlayer.jsx';

import Welcome from '../../ui/pages/Welcome.jsx';

import DashboardContainer from '../../ui/containers/DashboardContainer.jsx';


injectTapEventPlugin();

i18n.setLocale('en');

export const renderRoutes = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path ="welcome" component={Welcome} />
        <Route path="games/:id" component={GamePageContainer} />
        <Route path="signin" component={AuthPageSignIn} />
        <Route path="join" component={AuthPageJoin} />
        <Route path="dashboard" component={DashboardContainer} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </MuiThemeProvider>
);
