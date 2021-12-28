import { FC } from 'react';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';

import FeedLinePage from './Components/FeedLinePage/FeedLinePage';
import UserProfilePage from './Components/UserProfilePage/UserProfilePage';
import './App.scss';

enum Paths {
  Main = '/feed',
  Feed = '/feed/:pageNumber?',
  User = '/user/:userId?'
}

const App: FC = () => (
  <div className="App">
    <Switch>
      <Route path={Paths.Feed} exact component={FeedLinePage} />
      <Route path={Paths.User} exact component={UserProfilePage} />
      <Redirect to={Paths.Main} />
    </Switch>
  </div>
);

export default withRouter(App);
