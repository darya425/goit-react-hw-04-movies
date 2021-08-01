import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from './Components/Container';
import AppBar from './Components/AppBar';
import NotFoundViews from './Components/NotFoundView';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const HomePage = lazy(() =>
  import('./Components/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./Components/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Components/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense
        fallback={<Loader type="Puff" color="#3a7d87" height={50} width={50} />}
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundViews />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
