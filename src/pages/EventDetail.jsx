import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../components/EventDetails/EventDetails.css';
import '../components/Event/Events.css';
import Header from '../components/Header/Header.jsx';
import EventCard from '../components/EventCard/EventCard.jsx'
import MapForAddress from '../components/MapForAddress/MapForAddress.jsx'
import '../components/MapForAddress/MapForAddress.css'
import '../components/Map/Map.css'

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`);
      if (!response.ok) {
        throw new Error('Evento no encontrado');
      }
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchEvent();
}, [id]);

if (loading) return <p>Cargando evento...</p>;
if (error) return <p>{error}</p>;
if (!event) return <p>No se encontró el evento.</p>;

  return (
    <>
    <Header />
    <EventCard key={event._id} event={event} isDetail={true}/>
    <div className='mapforaddress-container'>
    <MapForAddress event={event} />
    </div>
    </>
  );
};

export default EventDetail;