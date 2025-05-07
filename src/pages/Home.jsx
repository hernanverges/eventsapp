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

  return (
    <div className='home-container'>
      <Header></Header>
      <div className="events-list">
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