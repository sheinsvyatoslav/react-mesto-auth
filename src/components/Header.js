import headerLogo from '../images/header/logo.svg'
import unwrapIcon from '../images/header/wrap-logo.svg'
import closeIcon from '../images/popup/close_button_icon.svg'
import { Link, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import { useMediaQuery } from 'react-responsive'
export default function Header(props) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    props.setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false')
    props.setUserData({})
    history.push('/signin');
  }

  function handleNavBarOpen() {
    props.setNavBarOpen(!props.navBarOpen)
  }

  return (
    <>
      {props.navBarOpen && <NavBar signOut={signOut} userData={props.userData}/>}
      <header className="header">
          <img className="header__image" src={headerLogo}  alt="Логотип проекта"/>
          {
          props.loggedIn ? 
          <>
          <button 
            onClick={handleNavBarOpen} 
            className="header__wrap-button" 
            type="button" 
            style={{  
            backgroundImage: `url(${props.navBarOpen ? closeIcon : unwrapIcon})`
            }}
          />
          {isBigScreen && <NavBar signOut={signOut} userData={props.userData}/>}
          </>
          : 
          <Link className="header__link" to={props.link}>{props.linkName}</Link>
          }    
      </header>
    </>
  )
}