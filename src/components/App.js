import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import NavBar from './NavBar';
import Links from './Links';
import SingleLink from './SingleLink';
import Tags from './Tags';

const App = () => {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/links/:id' component={SingleLink} />
        <Route path='/links' component={Links} />
        <Route path='/tags' component={Tags} />
      </Switch>
    </div>
  );
}

export default App;