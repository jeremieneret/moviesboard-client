import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

import MovieCard from '../components/MovieCard';

const MoviesList = () => {
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3000/movies')
                .then(response => {
                    setData(response.data.reverse())
                })

        }
        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='movie-list'>
            <h1 className='title'>what a big and impressive library you <br className='display' />got!</h1>
            {data && data.length !== 0 &&
                <ul>
                    {data?.map((movie, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => { history.push(`/movie-details/${movie.id}`) }}
                            >
                                <MovieCard
                                    movie={{
                                        i: movie.i,
                                        id: movie.id,
                                        title: movie.title,
                                        poster: movie.poster,
                                        release_date: movie.release_date,
                                        description: movie.description
                                    }}
                                ></MovieCard>
                            </li>
                        )
                    })}
                </ul>}
        </div>
    )
}

export default MoviesList
