import headerLogo from '../images/header/logo.svg'
export default function Header() {
  return (
    <header className="header">
        <img className="header__image" src={headerLogo}  alt="Логотип проекта"/>
    </header>
  )
}