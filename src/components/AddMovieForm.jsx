import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { TMDB_BASE_API, REACT_APP_TMDB_API_KEY, TMDB_IMG_URL_SUFFIX } from '../utils/api';


const AddMovieForm = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [casting, setCasting] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [movieTitle, setMovieTitle] = useState('');
    const [movieReleaseDate, setMovieReleaseDate] = useState('')
    const [movieDescription, setMovieDescription] = useState('');
    const [categories, setCategories] = useState('');
    useEffect(() => {
        const fetchMovie = async () => {
            const result = await axios.get(
                `${TMDB_BASE_API}/movie/${id}?api_key=${REACT_APP_TMDB_API_KEY}&language=fr`
            );

            setMovie(result.data);
            setDate(result.data.release_date)
            console.log(result.data);
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchMovie2 = async () => {
            const similarMoviesResult = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`
            );
            setSimilarMovies(similarMoviesResult.data);
        };
        fetchMovie2();
    }, [id]);

    useEffect(() => {
        const fetchMovie3 = async () => {
            const castingResult = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US`
            );
            setCasting(castingResult.data);
        };
        fetchMovie3();
    }, [id]);

    const addData = () => {

        axios.post('http://localhost:3000/movies', {
            title: movieTitle ? movieTitle : movie.title,
            release_date: movieReleaseDate ? movieReleaseDate : movie.release_date,
            categories: [categories ? categories : movie.overview],
            description: movieDescription ? movieDescription : movie.overview,
            poster: TMDB_IMG_URL_SUFFIX + movie.poster_path,
            backdrop: TMDB_IMG_URL_SUFFIX + movie.backdrop_path,
            actors: [
                {
                    name: casting.cast[0].name,
                    photo: TMDB_IMG_URL_SUFFIX + casting.cast[0].profile_path,
                    character: casting.cast[0].character
                },
                {
                    name: casting.cast[1].name,
                    photo: TMDB_IMG_URL_SUFFIX + casting.cast[1].profile_path,
                    character: casting.cast[1].character
                },
                {
                    name: casting.cast[2].name,
                    photo: TMDB_IMG_URL_SUFFIX + casting.cast[2].profile_path,
                    character: casting.cast[2].character
                },
                {
                    name: casting.cast[3].name,
                    photo: TMDB_IMG_URL_SUFFIX + casting.cast[3].profile_path,
                    character: casting.cast[3].character
                },
                {
                    name: casting.cast[4].name,
                    photo: TMDB_IMG_URL_SUFFIX + casting.cast[4].profile_path,
                    character: casting.cast[4].character
                },
                {
                    name: casting.cast[5].name,
                    photo: TMDB_IMG_URL_SUFFIX + casting.cast[5].profile_path,
                    character: casting.cast[5].character
                }
            ],
            similar_movies: [
                {
                    title: similarMovies.results[0].title,
                    poster: TMDB_IMG_URL_SUFFIX + similarMovies.results[0].poster_path,
                    release_date: '2022-11-11'
                },
                {
                    title: similarMovies.results[1].title,
                    poster: TMDB_IMG_URL_SUFFIX + similarMovies.results[1].poster_path,
                    release_date: '2022-11-11'
                },
                {
                    title: similarMovies.results[2].title,
                    poster: TMDB_IMG_URL_SUFFIX + similarMovies.results[2].poster_path,
                    release_date: '2022-11-11'
                }
            ],

        })
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error);
                return <p>Désolé, une erreur s'est glissée quelque part</p>
            });
    }



    if (!movie) return <p>No movie</p>;
    if (!similarMovies) return <p>No similar movies</p>
    if (!casting) return <p>No actors in this movie</p>

    return (
        <div className='add-movie-form'>

            {movie &&
                <div className="presentation-text">
                    <h1 className='title'>Vous souhaitez ajouter <span>{movie.title}</span> à votre bibliothèque ?</h1>
                    <h2>Ce formulaire pré-rempli va vous aider à créer une fiche.</h2>
                    <h2>Sentez-vous libre de modifier les champs si nécessaires !</h2>
                </div>
            }

            <form action="#">
                <div className="top-side">

                    {movie &&
                        <div className="top-left-side">
                            <div>
                                <label htmlFor="title">Titre du film :</label>
                                <input id='title' type="text" placeholder={movie.title} onChange={(e) => setMovieTitle(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="release_date">Sortie originale :</label>
                                <input id='release_date' type="text" placeholder={movie.release_date} onChange={(e) => setMovieReleaseDate(e.target.value)} />
                            </div>

                            <div className='description-large-screen'>
                                <label htmlFor="description">Description :</label> <br />
                                <textarea id='description' placeholder={movie.overview} onChange={(e) => setMovieDescription(e.target.value)}  ></textarea>
                            </div>
                        </div>}

                    {movie &&
                        <div className="top-right-side">
                            <img src={TMDB_IMG_URL_SUFFIX + movie.poster_path} alt='movie cover' />
                        </div>}

                </div>

                <div className="bottom-side">
                    {movie &&
                        <div>
                            <div className="bottom-side_section">
                                <div className='description-small-screen'>
                                    <label htmlFor="description">Description :</label> <br />
                                    <textarea id='description' placeholder={movie.overview} onChange={(e) => setMovieDescription(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div className="bottom-side_section">
                                <label htmlFor="categories">Ce film peut être classé dans ces catégories :</label>
                                <div className="categories">
                                    {movie.genres?.map((genre, i) => {
                                        return (
                                            <input
                                                key={i}
                                                genre={genre.name}
                                                placeholder={`#${genre.name}`}
                                                onChange={(e) => setCategories(e.target.value)}
                                                id='categories'
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    }

                    <div className="bottom-side_section">
                        <label>Dans ces catégories, on trouve aussi :</label>
                        {similarMovies.results &&
                            <div className='three-similar-movies'>
                                <div className="similar-movie">
                                    <img src={TMDB_IMG_URL_SUFFIX + similarMovies.results[0].poster_path} alt='movie cover' />
                                    <p>{similarMovies.results[0].title}</p>
                                </div>
                                <div className="similar-movie">
                                    <img src={TMDB_IMG_URL_SUFFIX + similarMovies.results[1].poster_path} alt='movie cover' />
                                    <p>{similarMovies.results[1].title}</p>
                                </div>
                                <div className="similar-movie">
                                    <img src={TMDB_IMG_URL_SUFFIX + similarMovies.results[2].poster_path} alt='movie cover' />
                                    <p>{similarMovies.results[2].title}</p>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="bottom-side_section">
                        <label>Ce film réunit un casting incroyable !</label>
                        {casting.cast &&
                            <ul className='casting'>
                                <li className='actor'>
                                    <img src={TMDB_IMG_URL_SUFFIX + casting.cast[0].profile_path} alt={`Portrait de : ${casting.cast[0].name}`} />
                                    <p><span>{casting.cast[0].name}</span> a.k.a. {casting.cast[0].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={TMDB_IMG_URL_SUFFIX + casting.cast[1].profile_path} alt={`Portrait de : ${casting.cast[1].name}`} />
                                    <p><span>{casting.cast[1].name}</span> a.k.a. {casting.cast[1].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={TMDB_IMG_URL_SUFFIX + casting.cast[2].profile_path} alt={`Portrait de : ${casting.cast[2].name}`} />
                                    <p><span>{casting.cast[2].name}</span> a.k.a. {casting.cast[2].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={TMDB_IMG_URL_SUFFIX + casting.cast[3].profile_path} alt={`Portrait de : ${casting.cast[3].name}`} />
                                    <p><span>{casting.cast[3].name}</span> a.k.a. {casting.cast[3].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={TMDB_IMG_URL_SUFFIX + casting.cast[4].profile_path} alt={`Portrait de : ${casting.cast[4].name}`} />
                                    <p><span>{casting.cast[4].name}</span> a.k.a. {casting.cast[4].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={TMDB_IMG_URL_SUFFIX + casting.cast[5].profile_path} alt={`Portrait de : ${casting.cast[5].name}`} />
                                    <p><span>{casting.cast[5].name}</span> a.k.a. {casting.cast[5].character}</p>
                                </li>

                            </ul>
                        }
                    </div>
                </div>

                <button onClick={addData}>Ajouter ce film à la bibliothèque</button>
            </form>
        </div>
    )
};

export default AddMovieForm
