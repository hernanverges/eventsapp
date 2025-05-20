import './Header.css';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, openAuthModal}) {

  return (
    <>
      {/* DESKTOP HEADER */}
      <div className='header-container'>
        <div className='logo-container'>
          <img
            src='/images/planazo-logo.png'
            alt='Planazo Logo'
            className='planazo-logo'
          />
        </div>


        <nav className='nav-menu'>
          <Link className='nav-Link' to='/'>Home</Link>
          <Link className='nav-Link' to='#'>Eventos</Link>
          <Link className='nav-Link' to='#'>Mapa</Link>
          {isLoggedIn ? (
            <Link className='nav-Link' to='/profile'>Perfil</Link>
          ) : (
            <Link className='nav-Link' onClick={openAuthModal}>Perfil</Link>
          )}
        </nav>

        <div className='search-bar'>
          <input type='text' placeholder='Buscar eventos...' />
        </div>
      </div>
    </>
  );
}

export default Header;