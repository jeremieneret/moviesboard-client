import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieCard = ({ movie }) => {
    const [data, setData] = useState([]);

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
        <div>
            {data?.map(movie => {

                return <div className='movie-card-and-btns_ctnr'>

                    <div className="movie-card">
                        <img src={movie.poster} alt="poster" />
                        <div className='text'>
                            <h1 className="small-title">{movie.title}</h1>
                            <p>Release date: {movie.release_date}</p>
                            <p className='description'>{movie.description}</p>
                        </div>
                    </div>

                    <div className="btns_ctnr">
                        <button>delete</button>
                        <button>edit</button>
                    </div>
                </div>

            })}
        </div>
    )
}

export default MovieCard
