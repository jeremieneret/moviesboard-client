import { Fragment, React, useEffect, useState } from 'react';
import axios from 'axios';


const SearchMovie = () => {

    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByReleaseYear, setSearchByReleaseYear] = useState('');
    const [data, setData] = useState('');
    const [targetId, setTargetId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const addData = (e) => {
        setTargetId(e.target.id)
        console.log(targetId)
        // .then(async (targetId) => {
        //     await axios(
        //         `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${targetId}&page=1&include_adult=false&primary_release_year=${searchByReleaseYear}`
        //     );
        // })
    }

    useEffect(() => {
        const onSearchMovie = async () => {
            if (searchByTitle) {
                const result = await axios(
                    `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${searchByTitle}&page=1&include_adult=false&primary_release_year=${searchByReleaseYear}`
                );
                setData(result.data.results)
            }
            else {
                setData(null)
            }
        }
        onSearchMovie()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchByTitle])

    useEffect(() => {
        const abracadabra = async () => {
            if (targetId) {
                await axios(
                    `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${targetId}&page=1&include_adult=false&primary_release_year=${searchByReleaseYear}`
                );
                setSelectedMovie(data)
                console.log(selectedMovie);
            }
        }
        abracadabra()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetId])


    return (
        <Fragment>
            <input
                className='search-input'
                onChange={e => setSearchByTitle(e.target.value)}
                value={searchByTitle}
                type='text'
                placeholder="what's its title? you can type here..."
            />
            <input
                className='search-input'
                onChange={e => setSearchByReleaseYear(e.target.value)}
                value={searchByReleaseYear}
                type='text'
                placeholder="you can precise the year of its release here!"
            />
            {data && data.length !== 0 && <ul>
                {data?.map((dat, i) => {
                    return (
                        <li
                            className='movie-result'
                            key={i}
                            id={dat.id}
                            onClick={addData}>
                            <p>{dat.title}</p>
                            <p>{dat.release_date}</p>
                        </li>
                    )
                })}
            </ul>}
            {/* {targetId &&
            <p>{targetId}</p>} */}
        </Fragment>
    )
}

export default SearchMovie;