import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard/EventCard.jsx'; 
import '../stylesheets/App.css';
import '../components/Map/Map.css';
import Map from '../components/Map/Map.jsx';
import Header from '../components/Header/Header.jsx';
import MobileNavBar from '../components/MobileNavBar/MobileNavBar.jsx';
import useIsMobile from '../hooks/useIsMobile.jsx';

const API = import.meta.env.VITE_API_URL; 

function Home() {

  //LOGICA DE RECUPERACION DE EVENTOS//

  const [events, setEvents] = useState([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API}/events`); 
        if (response.ok) {
          const data = await response.json();
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1);
          const validEvents = data.filter(event => new Date(event.date) > currentDate);
          setEvents(validEvents);
        } else {
          console.error('Error al cargar los eventos');
        }
      } catch (error) {
        console.error('Error en la solicitud GET', error);
      }
    };

    fetchEvents(); 
  }, []); 


//LOGICA PARA DEFINIR LAYOUT MOVIL O DESKTOP//
  const isMobile = useIsMobile();


//LOGICA PARA MANEJAR VENTANA DE INICIO DE SESION O REGISTRO//
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

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


  return (
    <div className='home-container'>
      {isMobile ? (
        <MobileNavBar isLoggedIn={isLoggedIn} openAuthModal={openAuthModal} />
      ) : (
        <Header isLoggedIn={isLoggedIn} openAuthModal={openAuthModal} />
      )}

      {showAuthModal && <AuthModal closeModal={closeAuthModal} />}

      <div className='events-list'>
        {events.map((event) => (
          <EventCard key={event._id} event={event} isDetail={false} /> 
        ))}
      </div>

      <div className='map-container'>
      {events.length > 0 && <Map events={events} />}
      </div>
    </div>
  );
}

export default Home;