import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal/AuthModal.jsx';

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='header-container'>
      <div className='logo-container'>
        <img
          src='/images/planazo-logo.png'
          alt='Planazo Logo'
          className='planazo-logo'
        />
      </div>

      <button className='hamburger' onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <Link className='nav-Link' to='/' onClick={() => setMenuOpen(false)}>Home</Link>
        <Link className='nav-Link' to='#' onClick={() => setMenuOpen(false)}>Eventos</Link>
        <Link className='nav-Link' to='#' onClick={() => setMenuOpen(false)}>Mapa</Link>

        {isLoggedIn ? (
          <Link className='nav-Link' to='/profile' onClick={() => setMenuOpen(false)}>Perfil</Link>
        ) : (
          <Link className='nav-Link' onClick={() => { openAuthModal(); setMenuOpen(false); }}>
            Perfil
          </Link>
        )}
      </nav>

      <div className='search-bar'>
        <input type='text' placeholder='Buscar eventos...' />
      </div>

      {showAuthModal && <AuthModal onClose={closeAuthModal} />}
    </div>
  );
}

export default Header;
