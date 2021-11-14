import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { TMDB_BASE_API, REACT_APP_TMDB_API_KEY } from '../utils/api';


const AddMovieForm = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [casting, setCasting] = useState([]);
    const [data, setData] = useState("");
    const [date, setDate] = useState("");
    const [year, month, day] = date.split("-");
    // eslint-disable-next-line no-unused-vars
    const [movieTitle, setMovieTitle] = useState('');
    const [movieReleaseDate, setMovieReleaseDate] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await axios.get(
                `${TMDB_BASE_API}/movie/${id}?api_key=${REACT_APP_TMDB_API_KEY}&language=fr`
            );

            setMovie(result.data);
            setDate(result.data.release_date)
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
            release_date: movieReleaseDate ? movieReleaseDate : `${day}/${month}/${year}`,
            categories: ['#genial', '#tropcool', '#jadore'],
            description: 'ta mère et la mienne',
            actors: [
                {
                    name: 'Jacky',
                    photo: 'https://blablabla.com',
                    character: 'l\'homme'
                }
            ],
            similar_movies: [{
                title: 'ya',
                poster: 'https://gogo.com',
                release_date: '2022-11-11'
            }],

        })
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                return <p>désolé, il y a une erreur quelque part</p>
            });
    }



    if (!movie) return <p>No movie</p>;

    return (
        <div className='add-movie-form'>

            {movie &&
                <div className="presentation-text">
                    <h1>Vous souhaitez ajouter <span>{movie.title}</span> à votre bibliothèque ?</h1>
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
                                <input id='release_date' type="text" placeholder={`${day}/${month}/${year}`} onChange={(e) => setMovieReleaseDate(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="description">Description :</label> <br />
                                <textarea id='description' placeholder={movie.overview} ></textarea>
                            </div>
                        </div>}

                    {movie &&
                        <div className="top-right-side">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='movie cover' />
                        </div>}

                </div>

                <div className="bottom-side">
                    {movie &&
                        <div className="bottom-side_section">
                            <label htmlFor="categories">Ce film peut être classé dans ces catégories :</label>
                            <div className="categories">
                                {movie.genres?.map((genre, i) => {
                                    return (
                                        <input
                                            key={i}
                                            genre={genre.name}
                                            placeholder={`#${genre.name}`}
                                            // onChange={(e) => setSearchByTitle(e.target.value)}
                                            id='categories'
                                        />
                                    )
                                })}
                            </div>
                        </div>}

                    <div className="bottom-side_section">
                        <label>Dans ces catégories, on trouve aussi :</label>
                        {similarMovies.results &&
                            <div className='three-similar-movies'>
                                <div className="similar-movie">
                                    <img src={`https://image.tmdb.org/t/p/w500/${similarMovies.results[0].poster_path}`} alt='movie cover' />
                                    <p>{similarMovies.results[0].title}</p>
                                </div>
                                <div className="similar-movie">
                                    <img src={`https://image.tmdb.org/t/p/w500/${similarMovies.results[1].poster_path}`} alt='movie cover' />
                                    <p>{similarMovies.results[1].title}</p>
                                </div>
                                <div className="similar-movie">
                                    <img src={`https://image.tmdb.org/t/p/w500/${similarMovies.results[2].poster_path}`} alt='movie cover' />
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
                                    <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[0].profile_path}`} alt={`Portrait de : ${casting.cast[0].name}`} />
                                    <p><span>{casting.cast[0].name}</span> a.k.a. {casting.cast[0].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[1].profile_path}`} alt={`Portrait de : ${casting.cast[1].name}`} />
                                    <p><span>{casting.cast[1].name}</span> a.k.a. {casting.cast[1].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[2].profile_path}`} alt={`Portrait de : ${casting.cast[2].name}`} />
                                    <p><span>{casting.cast[2].name}</span> a.k.a. {casting.cast[2].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[3].profile_path}`} alt={`Portrait de : ${casting.cast[3].name}`} />
                                    <p><span>{casting.cast[3].name}</span> a.k.a. {casting.cast[3].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[4].profile_path}`} alt={`Portrait de : ${casting.cast[4].name}`} />
                                    <p><span>{casting.cast[4].name}</span> a.k.a. {casting.cast[4].character}</p>
                                </li>

                                <li className='actor'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[5].profile_path}`} alt={`Portrait de : ${casting.cast[5].name}`} />
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
