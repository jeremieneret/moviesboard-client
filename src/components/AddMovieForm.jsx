import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';


const AddMovieForm = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr`
            );
            setMovie(result.data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <p>No movie</p>;

    return <div>{movie.title}</div>;
};

export default AddMovieForm
