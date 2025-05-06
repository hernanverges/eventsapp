import '../stylesheets/Events.css';
import Event from './Event.jsx';
import EventDetails from './EventDetails.jsx'

function EventCard({ event, isDetail }) {
  function capitalize(str) {
    if (typeof str !== 'string' || !str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
  
    isDetail ? 
    <EventDetails
      key={event._id} 
      id={event._id}
      title={event.title}
      date={new Date(event.date).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })}
      description={event.description}
      direction={capitalize(event.direction)}
      city={capitalize(event.city)}
      province={capitalize(event.province)}
      price={event.price}
      time={event.time}
      category={event.category}
    />

    :

    <Event
      key={event._id} 
      id={event._id}
      title={event.title}
      date={new Date(event.date).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })}
      description={event.description}
      direction={capitalize(event.direction)}
      city={capitalize(event.city)}
      province={capitalize(event.province)}
      price={event.price}
      time={event.time}
      category={event.category}
    />
  );
}

export default EventCard;
