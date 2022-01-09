import React from 'react';
import headerLogo from '../images/header/logo.svg'
import unwrapIcon from '../images/header/wrap-logo.svg'
import closeIcon from '../images/popup/close_button_icon.svg'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import { useMediaQuery } from 'react-responsive'
import NavBar from './NavBar'

export default function Header(props) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })
  const location = useLocation();

  function handleNavBarOpen() {
    props.setNavBarOpen(!props.navBarOpen)
  }

  function renderNavBar() {
    if(location.pathname === '/') {
      return (
        <>
          {isBigScreen ?
            <>
            <p className="header__user-email">{props.userEmail}</p>
            <button onClick={props.signOut} className="navbar__button">Выйти</button> 
            </>
            :
            <button 
              onClick={handleNavBarOpen} 
              className="header__wrap-button" 
              type="button" 
              style={{  
              backgroundImage: `url(${props.navBarOpen ? closeIcon : unwrapIcon})`
              }}
            />
          }
        </>
      )
    }
    if(location.pathname === '/signup') {
      return <Link className="header__link" to="/signin">Войти</Link>
    }
    if(location.pathname === '/signin') {
      return <Link className="header__link" to="/signup">Регистрация</Link>
    }
  }

  return ( 
    <>
    {isBigScreen ?
      <header className="header">
        <img className="header__image" src={headerLogo}  alt="Логотип проекта"/>
        <nav className="header__navbar">
          {renderNavBar()}
        </nav>
      </header> :
      <>
        {props.navBarOpen && <NavBar signOut={props.signOut} userEmail={props.userEmail}/>}
        <header className="header">
          <img className="header__image" src={headerLogo}  alt="Логотип проекта"/>
          <div className="header__navbar">
            {renderNavBar()}
          </div>
        </header>
      </>
    }
    </>
  )
}