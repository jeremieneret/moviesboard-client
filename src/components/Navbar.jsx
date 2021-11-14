import React from 'react'
import { useHistory } from 'react-router';

const Navbar = () => {
    const history = useHistory();
    return (
        <nav>
            <div className="ctnr">
                <h1 className="logo">My Movies<br />Collection</h1>
                <ul>
                    <li onClick={() => { history.push('/movies-list') }}>
                        Mes films
                    </li>
                    <li onClick={() => { history.push('/add-a-movie') }}>
                        Ajouter un film ?
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
