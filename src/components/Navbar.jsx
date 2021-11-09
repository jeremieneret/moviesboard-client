import React from 'react'
import { useHistory } from 'react-router';

const Navbar = () => {
    const history = useHistory();
    return (
        <nav>
            <h1 className="logo">My Movies<br />Collection</h1>
            <ul>
                <li onClick={() => {history.push('/MoviesList')}}>
                    <p>Movies List</p>
                </li>
                <li onClick={() => {history.push('/AddMovie')}}>
                    <p>Add a movie ?</p>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
