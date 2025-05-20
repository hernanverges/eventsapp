import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal/AuthModal.jsx';
import { FaHome, FaMapMarkedAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch (error) {
      return true; 
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setShowAuthModal(true);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

        <button className='hamburger' onClick={toggleSidebar}>☰</button>

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

      {/* MOBILE NAVBAR */}
      <div className='mobile-navbar'>
      <button className='hamburger' onClick={toggleSidebar}>☰</button>
        <img
          src='/images/planazo-logo.png'
          alt='Planazo Logo'
          className='planazo-logo'
        />
        <div className='search-bar'>
          <input type='text' placeholder='Buscar eventos...' />
        </div>
      </div>

      {/* SIDEBAR  */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Link to='/' onClick={toggleSidebar}><FaHome /> Home</Link>
        <Link to='#' onClick={toggleSidebar}><FaCalendarAlt /> Eventos</Link>
        <Link to='#' onClick={toggleSidebar}><FaMapMarkedAlt /> Mapa</Link>
        {isLoggedIn ? (
          <Link to='/profile' onClick={toggleSidebar}><FaUser /> Perfil</Link>
        ) : (
          <Link onClick={() => { openAuthModal(); toggleSidebar(); }}>
            <FaUser /> Perfil
          </Link>
        )}
      </div>

      {showAuthModal && <AuthModal onClose={closeAuthModal} />}
    </>
  );
}

export default Header;