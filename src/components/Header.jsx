import '../stylesheets/Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div
        className='header-container'>

        <div className='logo-container'>
        <img
        src="/images/planazo-logo.png"
        alt="Planazo Logo"
        className='planazo-logo' />
        </div>

        <nav className="nav-menu">
        <Link className='nav-Link' to="/">Home</Link>
        <Link className='nav-Link' to="#">Eventos</Link>
        <Link className='nav-Link' to="#">Mapa</Link>
        <Link className='nav-Link' to="#">Perfil</Link>
        </nav>

        <div className="search-bar">
        <input type="text" placeholder="Buscar eventos..." />
        </div>



        </div>

        
    )
}

export default Header;