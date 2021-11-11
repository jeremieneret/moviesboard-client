import { Fragment, React, useEffect, useState } from 'react';
import axios from 'axios';




const SearchMovie = () => {

    const [searchInputText, setSearchInputText] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {

        const onSearchMovie = async () => {
            if (searchInputText) {
                const result = await axios(
                    `https://api.themoviedb.org/3/search/movie?api_key=6d297bdaca2dc66c4fe66393850480f4&language=fr&query=${searchInputText}&page=1&include_adult=false`
                );
                setData(result.data.results);
            }
            else {
                setData(null)
            }
        }
        onSearchMovie();
        if (data) {

            console.log(data[0].title);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInputText])

    return (
        <Fragment>
            <main>
                <input
                    className='search-input'
                    onChange={e => setSearchInputText(e.target.value)}
                    value={searchInputText}
                    type='text'
                    placeholder="what is the title of our new movie?"
                />
                {data && data.length !== 0 && <ul>
                    {data?.map((dat, i) => {
                        return (
                            <li key={i}>
                                <p>{dat.title}</p>
                                <p>{dat.release_date}</p>
                            </li>
                        )
                    })}
                </ul>}
            </main>
        </Fragment>
    )
}

export default SearchMovie;