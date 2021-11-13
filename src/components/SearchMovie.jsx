import { Fragment, React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchMovie = () => {
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByReleaseYear, setSearchByReleaseYear] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const onSearchMovie = async () => {
      if (searchByTitle) {
        const result = await axios(
          `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${searchByTitle}&page=1&include_adult=false&primary_release_year=${searchByReleaseYear}`
        );
        setData(result.data.results);
      } else {
        setData(null);
      }
    };
    onSearchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByTitle]);


  return (
    <Fragment>
      <input
        className="search-input"
        onChange={(e) => setSearchByTitle(e.target.value)}
        value={searchByTitle}
        type="text"
        placeholder="what's its title? you can type here..."
      />
      <input
        className="search-input"
        onChange={(e) => setSearchByReleaseYear(e.target.value)}
        value={searchByReleaseYear}
        type="text"
        placeholder="you can precise the year of its release here!"
      />
      {data && data.length !== 0 && (
        <ul>
          {data?.map((dat, i) => {
            console.log(dat);
            return (
              <Link to={`/add-movie-form/${dat.id}`}>
                <li
                  className="movie-result"
                  key={i}
                  id={dat.id}
                >
                  <p>{dat.title}</p>
                  <p>{dat.release_date}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default SearchMovie;
