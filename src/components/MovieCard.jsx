import React from 'react';

const MovieCard = ({ movie }) => {


    return (
        <div className='movie-card-and-btns_ctnr'>

            <div className="movie-card">
                <img src={movie.poster} alt="poster" />
                <div className='text'>
                    <h1 className="small-title"><span className='regular-fw'>{movie.title}</span></h1>
                    <p><span>Date de sortie:</span>  {movie.release_date}</p>
                    <p className='description'>{movie.description}</p>
                </div>
            </div>

            <div className="btns_ctnr">
                <button className='movie-card-btn'>delete</button>
                <button className='movie-card-btn'>edit</button>
            </div>

        </div>
    )
}

export default MovieCard
