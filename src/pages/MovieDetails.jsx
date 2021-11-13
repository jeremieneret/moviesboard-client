import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${movieTitle}&page=1&include_adult=false`;

function MovieDetails() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:3000/movies/${id}`).then((response) => {
        setData(response.data);
        setDate(response.data.release_date);
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //let's convert date into a convenient format
  const [year, month, day] = date.split("-");

  console.log(`${day}/${month}/${year}`);
  return (
    <Fragment>
      {data && (
        <div className="movie-details">
          <div className="backdrop_ctnr">
            <img className="backdrop" src={data.backdrop} alt="backdrop" />
          </div>

          <h1 className="title">{data.title}</h1>

          <div className="three-panels-layout">
            <div className="left-panel">
              {data.categories?.map((category, i) => {
                return (
                  <ul>
                    <li key={i}>
                      <p className="categories">#{category}</p>
                    </li>
                  </ul>
                );
              })}

              <br />
              <p>
                Release date: {day}/{month}/{year}
              </p>
              <br />
              <p>{data.description}</p>
            </div>

            <div className="center-panel">
              <img src={data.poster} alt="poster" />
            </div>

            <div className="right-panel">
              {data.actors?.map((actor) => {
                return (
                  <ul>
                    <li>
                      <img src={actor.photo} alt="actor portait" />
                    </li>
                    <li>{actor.name}</li>
                  </ul>
                );
              })}
            </div>
          </div>

          <div className="similar-movies_ctnr">
            <h2>In the same categories, there are also:</h2>
            <div className="similar-movies">
              {data.similar_movies?.map((similar_movie) => {
                return (
                  <ul>
                    <li>{similar_movie.title}</li>
                    <li>
                      <img src={similar_movie.poster} alt="movie poster" />
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default MovieDetails;
