import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { generateAsyncComponent } from './components/AsyncComponent';

const Home = generateAsyncComponent(() =>
  import(/* webpackChunkName: "Home" */ './screens/Home')
);

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect from="*" to="/home" />
      </Switch>
    </>
  );
};

export default App;
