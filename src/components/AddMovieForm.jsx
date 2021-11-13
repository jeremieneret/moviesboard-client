import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { TMDB_BASE_API, REACT_APP_TMDB_API_KEY } from '../utils/api';


const AddMovieForm = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [casting, setCasting] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await axios.get(
                `${TMDB_BASE_API}/movie/${id}?api_key=${REACT_APP_TMDB_API_KEY}&language=fr`
            );

            setMovie(result.data);
            console.log(result.data);
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchMovie2 = async () => {
            const similarMoviesResult = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=6d297bdaca2dc66c4fe66393850480f4&language=en-US`
            );
            setSimilarMovies(similarMoviesResult.data);
            console.log(similarMoviesResult.data);
        };
        fetchMovie2();
    }, [id]);

    useEffect(() => {
        const fetchMovie3 = async () => {
            const castingResult = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6d297bdaca2dc66c4fe66393850480f4&language=en-US`
            );
            for (let i = 0; i < 6; i++) {
                setCasting(castingResult.data);
                console.log(castingResult.data.cast);
            }
        };
        fetchMovie3();
    }, [id]);


    if (!movie) return <p>No movie</p>;

    return (
        <div>
            <p>
                {movie.title}
            </p>
            <p>
                {movie.release_date}
            </p>
            <p>
                {movie.overview}
            </p>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='movie cover' />
            <ul>
                {movie.genres?.map((genre, i) => {
                    return (
                        <li
                            key={i}
                            genre={genre.name}
                        >
                            <p>#{genre.name}</p>

                        </li>
                    )
                })}
            </ul>

            {similarMovies.results &&
                <ul>
                    <li>{similarMovies.results[0].title}</li>
                    <img src={`https://image.tmdb.org/t/p/w500/${similarMovies.results[0].poster_path}`} alt='movie cover' />
                    <li>{similarMovies.results[1].title}</li>
                    <img src={`https://image.tmdb.org/t/p/w500/${similarMovies.results[1].poster_path}`} alt='movie cover' />
                    <li>{similarMovies.results[2].title}</li>
                    <img src={`https://image.tmdb.org/t/p/w500/${similarMovies.results[2].poster_path}`} alt='movie cover' />
                </ul>
            }
            <ul>
                {casting.cast &&
                    <ul>
                        <li>
                            <p>{casting.cast[0].name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[0].profile_path}`} alt={`${casting.cast[0].name} portait`} />
                        </li>

                        <li>
                            <p>{casting.cast[1].name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[1].profile_path}`} alt={`${casting.cast[0].name} portait`} />
                        </li>

                        <li>
                            <p>{casting.cast[2].name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[2].profile_path}`} alt={`${casting.cast[0].name} portait`} />
                        </li>

                        <li>
                            <p>{casting.cast[3].name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[3].profile_path}`} alt={`${casting.cast[0].name} portait`} />
                        </li>

                        <li>
                            <p>{casting.cast[4].name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[4].profile_path}`} alt={`${casting.cast[0].name} portait`} />
                        </li>

                        <li>
                            <p>{casting.cast[5].name}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${casting.cast[5].profile_path}`} alt={`${casting.cast[0].name} portait`} />
                        </li>

                    </ul>

                }
            </ul>




        </div>
    )
};

export default AddMovieForm
