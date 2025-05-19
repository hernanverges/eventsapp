import { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import './UserEvents.css';

export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await fetch('http://localhost:5000/api/events');
        const eventsData = await eventsRes.json();


        const token = localStorage.getItem("token");
        const userRes = await fetch('http://localhost:5000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userRes.json();


        const likedEventIds = userData.likedEvents || [];
        const filteredEvents = eventsData.filter(event =>
          likedEventIds.includes(event._id)
        );

        setEvents(eventsData);
        setUserEvents(filteredEvents);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='userevents-container'>
      {userEvents.map(event => (
        <EventCard
          key={event._id}
          event={event}
          isDetail={false}
        />
      ))}
    </div>
  );
}
