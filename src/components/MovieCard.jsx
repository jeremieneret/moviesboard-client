import React from 'react';

const MovieCard = ({ movie }) => {

    return (
        <div className='movie-card-and-btns_ctnr'>

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
    )
}

export default MovieCard
