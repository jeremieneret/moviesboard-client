import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';

const MoviesList = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDisplay, setModalDisplay] = useState('closed')
    const [selectedMovie, setSelectedMovie] = useState(null)
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

    const openModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true);
            setModalDisplay('modal open')
        }
    }


    return (
        <div className='movie-list'>
            <h1 className='title'>Quelle belle collection de films vous avez là !</h1>
            {data && data.length !== 0 &&
                <ul>
                    {data?.map((movie, i) => {
                        return (
                            <div className='movie-card-and-btns__ctnr'>
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
                                <div className="btns_ctnr">
                                    <button className='movie-card-btn' onClick={() => { setSelectedMovie(movie); openModal() }}>delete</button>
                                    <button className='movie-card-btn'>edit</button>
                                </div>

                            </div>


                        )
                    })}

                </ul>}
            {data && selectedMovie &&

                <div
                    className={modalDisplay}
                >
                    <Modal
                        movie={{
                            i: selectedMovie.i,
                            id: selectedMovie.id,
                            poster: selectedMovie.poster
                        }} />
                </div>

            }


        </div>
    )
}

export default MoviesList
