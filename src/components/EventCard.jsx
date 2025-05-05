import '../stylesheets/Events.css';
import Event from './Event.jsx';

import '../stylesheets/Events.css';
import Event from './Event.jsx';

function EventCard({ event }) {

  function capitalize(str) {
    if (typeof str !== 'string' || !str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <Event
      key={event._id} 
      id={event._id}
      title={event.title}
      date={new Date(event.date).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })}
      direction={capitalize(event.direction)}
      city={capitalize(event.city)}
      province={capitalize(event.province)}
      price={event.price}
      time={event.time}
    />
  );
}

export default EventCard;
