import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

import MovieCard from '../components/MovieCard';

const MoviesList = () => {
    const [data, setData] = useState([]);
    const history = useHistory();

    //we use useEffect to fetch datas from the api and set the result in the 'data' array
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3000/movies')
                .then(response => {
                    setData(response.data)
                })
        }
        fetchData();
    }, [])

    return (
        <div className='movie-list'>
            <h1 className='title'>what a big and impressive library you <br className='display'/>got!</h1>
            {data && data.length !== 0 &&
                <ul>
                    {data?.map((movie, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => {history.push(`/MovieDetails/${movie.id}`)}}
                            >
                                <MovieCard
                                    movie={{
                                        i: i,
                                        id: movie.id,
                                        title: movie.title,
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
