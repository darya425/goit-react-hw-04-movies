import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from './Components/Container';
import AppBar from './Components/AppBar';
import Footer from './Components/Footer';
import NotFoundViews from './Components/NotFoundView';
import Spinner from './Components/Spinner';

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
      <Suspense fallback={<Spinner />}>
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
      <Footer />
    </Container>
  );
}

export default App;
