import { Fragment, React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import axios from "axios";

import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieDetails from "./pages/MovieDetails";
import MoviesList from "./pages/MoviesList";
import Navbar from "./components/Navbar";
import "./style/CSS/style.css";

import Test from "./Test";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr`
      );
      setMovie(result.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>No movie</p>;

  return <div>{movie.title}</div>;
};

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <main className="ctnr">
          <Test />
          <Switch>
            <Route exact path="/movie/:id" component={MoviePage} />
            <Route exact path="/AddMovie" component={AddMovie} />
            <Route path="/MoviesList" component={MoviesList} />
            <Route path="/MovieDetails/:id" component={MovieDetails} />
            <Route exact path="/EditMovie" component={EditMovie} />
          </Switch>
        </main>
      </Router>
    </Fragment>
  );
}

export default App;
