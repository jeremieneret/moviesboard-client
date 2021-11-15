import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

const Navbar = () => {
    const history = useHistory();
    const [menuBtnClassName, setMenuBtnClassName] = useState('menu-btn');
    const [navClassName, setNavClassName] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        if (!menuOpen) {
            setMenuOpen(true)
            setMenuBtnClassName('menu-btn open')
            setNavClassName('open')
        } else {
            setMenuOpen(false)
            setMenuBtnClassName('menu-btn')
            setNavClassName('')
        }
    }

    const closeMenu = () => {
        setMenuOpen(false)
        setMenuBtnClassName('menu-btn')
        setNavClassName('')
    }


    return (
        <div className='navbar'>
            <div className="ctnr">
                <h1 className="logo">My Movies<br />Collection</h1>
                <nav className={navClassName}>
                    <div className="desktop">
                        <ul>
                            <li onClick={() => { history.push('/movies-list') }}>
                                Mes films
                            </li>
                            <li onClick={() => { history.push('/add-a-movie') }}>
                                Ajouter un film ?
                            </li>
                        </ul>
                    </div>
                    <div className="mobile">
                        <ul>
                            <div onClick={closeMenu}>
                                <li onClick={() => { history.push('/movies-list') }}>
                                    Mes films
                                </li>
                                <li onClick={() => { history.push('/add-a-movie') }}>
                                    Ajouter un film ?
                                </li>
                            </div>
                        </ul>
                    </div>
                </nav>
                <div
                    className={menuBtnClassName}
                    onClick={openMenu}
                >
                    <div className="menu-btn__burger"></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
