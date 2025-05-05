import '../stylesheets/Header.css';

function Header() {
    return (
        <div
        className='header-container'>

        <img
        src="/images/planazo-logo.png"
        alt="Planazo Logo"
        className='planazo-logo' />

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