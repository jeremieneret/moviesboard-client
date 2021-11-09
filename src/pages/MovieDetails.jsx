//This little tool is going to help us to build a library of actors, to make the game more personalization and fun
//We use the Search method of tmdb Api

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${movieTitle}&page=1&include_adult=false`;


function MovieDetails() {




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
    console.log(data);
    return (
        <div>


            <img src={data[0]?.poster} alt="poster" />
            <img src={data[0]?.backdrop} alt="backdrop" />
            <h1>{data[0]?.title}</h1>
            <p>{data[0]?.categories}</p>
            <p>{data[0]?.description}</p>
            <h2>avec :</h2>
            {
                data.map(dat => {
                    return dat.actors.map((actor) => {
                        return <ul>
                            <li>{actor.name} as {actor.character}</li>
                            <img src={actor.photo} alt="portraits of actors" />
                        </ul>
                    })
                })
            }
            {
                data.map(dat => {
                    return dat.similar_movies.map((similarMovie) => {
                        return <ul>
                            <li>{similarMovie.title}</li>
                            <img src={similarMovie.poster} alt="poster" />
                            <li>{similarMovie.release_date}</li>
                        </ul>
                    })
                })
            }

        </div>
    )

};
export default MovieDetails;