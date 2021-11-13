import React, { useState } from 'react'
import axios from 'axios';
import SearchMovie from '../components/SearchMovie';

const AddMovie = () => {

    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);

    const addData = () => {
        axios.post('http://localhost:3000/movies', {
            title: 'La Soupe',
            release_date: '2022-12-06',
            categories: ['ss', 's'],
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
                setData(response.data)
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div className='add-movie'>
            <h1 className='title'>add a movie, darling!</h1>
            <SearchMovie />
            <button onClick={addData}>Test me!</button>
        </div>
    )
}

export default AddMovie
