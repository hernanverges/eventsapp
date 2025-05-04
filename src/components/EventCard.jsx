import '../stylesheets/Events.css';
import Event from './Event.jsx';

function EventCard({ evento }) {
  return (
    <Event
      key={evento._id} 
      id={evento._id}
      title={evento.title}
      date={evento.date}
      location={evento.location}
      time={evento.time}
    />
  );
}

export default EventCard;
