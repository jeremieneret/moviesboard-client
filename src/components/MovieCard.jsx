import React from 'react';

const MovieCard = ({ movie }) => {


    return (

        <div className="movie-card">
            <img src={movie.poster} alt="poster" />
            <div className='text'>
                <h1 className="small-title"><span className='regular-fw'>{movie.title}</span></h1>
                <p><span>Date de sortie:</span>  {movie.release_date}</p>
                <p className='description'>{movie.description}</p>
            </div>
        </div>

    )
}

export default MovieCard
