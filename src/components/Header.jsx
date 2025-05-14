import '../stylesheets/Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


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

      {showAuthModal && <AuthModal onClose={closeAuthModal} />}
    </div>
  );
}

export default Header;
