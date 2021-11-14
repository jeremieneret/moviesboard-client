import { Fragment, React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TMDB_BASE_API, REACT_APP_TMDB_API_KEY, TMDB_IMG_URL_SUFFIX } from "../utils/api";

const SearchMovie = () => {
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByReleaseYear, setSearchByReleaseYear] = useState("");
  const [data, setData] = useState("");


  useEffect(() => {
    const onSearchMovie = async () => {
      if (searchByTitle) {
        const result = await axios(
          `${TMDB_BASE_API}/search/movie?api_key=${REACT_APP_TMDB_API_KEY}&language=fr&query=${searchByTitle}&page=1&include_adult=false&primary_release_year=${searchByReleaseYear}`
        );
        setData(result.data.results);
        console.log(data);
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
        placeholder="Quel est son titre ? Vous pouvez taper ici..."
      />
      <input
        className="search-input"
        onChange={(e) => setSearchByReleaseYear(e.target.value)}
        value={searchByReleaseYear}
        type="text"
        placeholder="you can precise the year of its release here!"
      />
      {data && data.length !== 0 && (
        <ul className='movie-results'>
          {data?.map((dat, i) => {
            return (
              <Link to={`/add-movie-form/${dat.id}`}>
                <li
                  key={i}
                  className="movie-result"
                  id={dat.id}
                >
              {dat.poster_path
                ?<img src={TMDB_IMG_URL_SUFFIX + dat.poster_path} alt="movie cover" />
                : <div className='gradient-placeholder'></div>}

                <div className="text">
                <p><span>{dat.title}</span></p>
              {dat.release_date &&

                <p>{dat.release_date.slice(0, 4)}</p>
              }
                </div>
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
