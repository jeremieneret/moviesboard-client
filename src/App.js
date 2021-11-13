import { Fragment, React } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieDetails from "./pages/MovieDetails";
import MoviesList from "./pages/MoviesList";
import AddMovieForm from "./components/AddMovieForm";
import Navbar from "./components/Navbar";
import "./style/CSS/style.css";

import Test from "./Test";


function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <main className="ctnr">
          <Test />
          <Switch>
            <Route exact path="/add-movie-form/:id" component={AddMovieForm} />
            <Route exact path="/add-a-movie" component={AddMovie} />
            <Route path="/movies-list" component={MoviesList} />
            <Route path="/movie-details/:id" component={MovieDetails} />
            <Route exact path="/edit-movie" component={EditMovie} />
          </Switch>
        </main>
      </Router>
    </Fragment>
  );
}

export default App;
