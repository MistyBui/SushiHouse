import React , { Component } from 'react';
import {Link} from 'react-router-dom'; //anchor links
import logo from '../logo.svg';
import {ButtonContainer} from './Button';
import styled from 'styled-components';

export default class NavBar extends Component {
    render() {
        return (
            <NavContainer className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to='/'>    {/* link for logo */}
                    <img src={logo} alt='brandlogo' width="60px" height='auto' className='navbar-brand' />
                </Link>
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-item ml-5'>
                        <Link to='/' className='nav-link'>Products</Link>    {/* link for products */}
                    </li>
                </ul>
                <Link to='/cart' className='ml-auto'>     {/* link for shopping cart button */}
                    <ButtonContainer>
                        <span className='mr=2'>
                            <i className='fas fa-shopping-cart' />
                        </span>
                         My cart
                    </ButtonContainer>
                </Link>
            </NavContainer>
        )
    }
}  

const NavContainer = styled.nav`
    background: var(--mainOrange);
    .nav-link{
        color:var(--mainWhite) !important;
        font-size: 1.3rem; 
        text-transform: capitalize;
    }
`

