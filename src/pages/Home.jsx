import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard'; 
import '../stylesheets/App.css';
import '../stylesheets/Map.css';
import Map from '../components/Map.jsx';
import Header from '../components/Header.jsx';

const API = import.meta.env.VITE_API_URL; 

function Home() {
  const [events, setEvents] = useState([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API}/events`); 
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Error al cargar los eventos');
        }
      } catch (error) {
        console.error('Error en la solicitud GET', error);
      }
    };

    fetchEvents(); 
  }, []); 

  return (
    <div className='home-container'>
      <Header></Header>
      <div className="events-list">
        {events.map((evento) => (
          <EventCard key={evento._id} evento={evento} /> 
        ))}
      </div>

      <div className='map-container'>
        <Map />
      </div>
    </div>
  );
}

export default Home;