//This little tool is going to help us to build a library of actors, to make the game more personalization and fun
//We use the Search method of tmdb Api

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${movieTitle}&page=1&include_adult=false`;


function SearchMovies() {




    const [data, setData] = useState([]);

    //we use useEffect to fetch datas from the api and set the result in the 'data' array
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3000/movies')            
            .then(response => {
                setData(response.data)
                console.log(response);
                response.data.map((dat) => {
                    return dat.actors?.map((actor) => {
                        return console.log(actor);
                    })
                })
            })
        }
        fetchData();
    }, [])
    return (
        <div>


            <h1>{data[0]?.title}</h1>

            <h2>avec :</h2>
            <ul>
                {data.actors?.map((i) => {
                    return (
                        <li key={i}>{data.actors.name}</li>
                    )

                })
                }
            </ul>
        </div>
    )

};
export default SearchMovies;