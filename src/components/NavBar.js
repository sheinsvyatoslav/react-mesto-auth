export default function NavBar(props) {
  return (
    <nav className="navbar">
      <p className="navbar__user-email">{props.userData.email}</p>
      <button onClick={props.signOut} className="navbar__button">Выйти</button>
    </nav>
  )
}