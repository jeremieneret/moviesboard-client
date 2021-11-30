import React, { useState } from 'react'
import axios from 'axios'

const Modal = ({ movie }) => {



    return (
        <div className='modal__ctnr'>
            <div className="modal__content">
                <h3>Que souhaitez-vous faire ?</h3>
                <img src={movie.poster} alt="" />
                <button className='movie-card-btn' onClick={() => {
                    axios.delete(`http://localhost:3000/movies/${movie.id}`);
                    window.location.reload(false);
                }}>Retirer cette daube de ma bibliothèque</button>
                <button onClick={() => window.location.reload(false)}>La garder car j'aime bien les daubes</button>
            </div>
        </div>
    )
}

export default Modal


