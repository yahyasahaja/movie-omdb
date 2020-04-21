import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { generateAsyncComponent } from './components/AsyncComponent';
import ImagePresentation from 'components/ImagePresentation';

const Movies = generateAsyncComponent(() =>
  import(/* webpackChunkName: "Movies" */ './screens/Movies')
);

const MovieDetail = generateAsyncComponent(() =>
  import(/* webpackChunkName: "MovieDetail" */ './screens/MovieDetail')
);

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/movies/:imdbID" component={MovieDetail} />
        <Route path="/movies" component={Movies} />
        <Redirect from="*" to="/movies" />
      </Switch>
      <ImagePresentation />
    </>
  );
};

export default App;
