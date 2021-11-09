import { Fragment, React } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import MovieDetails from './pages/MovieDetails';
import MoviesList from './pages/MoviesList';
import Navbar from './components/Navbar';
import './style/CSS/style.css'


function App() {

  return (
    <Fragment>
      <Router>
            <Navbar />
            <MovieDetails />
            <Switch>
                <Route exact path='/AddMovie' component={AddMovie} />
                <Route path='/MoviesList' component={MoviesList} />
                <Route path='/MovieDetail/:id' component={MovieDetails} />
                <Route exact path='/EditMovie' component={EditMovie} />
            </Switch>
      </Router>
    </Fragment>
  );
}

export default App;