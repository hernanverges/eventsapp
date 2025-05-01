import '../stylesheets/Header.css'

function Header() {
    return (
        <div
        className='header-container'>

        <div
        className="logo-text">
        <h1>Planazo.AR</h1>
        </div>

        <nav className="nav-menu">
        <a href="#">Eventos</a>
        <a href="#">Mapa</a>
        <a href="#">Perfil</a>
        </nav>

        <div className="search-bar">
        <input type="text" placeholder="Buscar eventos..." />
        </div>



        </div>

        
    )
}

export default Header;