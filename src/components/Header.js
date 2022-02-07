import logo from '../images/png/logo.png';
import React from 'react';

function Header() {

    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип страницы" />
        </header>
    )
}

export default Header;