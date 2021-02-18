import React from 'react';
import { Container } from 'reactstrap'
import FigLoansLogo from '../fig-loans-logo.png'

const Header = () => {

    return (
        <div className='header'>
        <div className='logo'>
            <img className='logoimg' src={FigLoansLogo} />
        </div>
        </div>
    )
}

export default Header