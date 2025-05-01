import { Link } from 'react-router-dom';
import '../stylesheets/Events.css';

function Event({ id, title, date, location }) {
  return (
    <div className='event-card'>
      <h2>{title}</h2>
      <img 
        className='event-image'
        src={`./images/${id}.png`} 
        alt={`Imagen de ${title}`} 
      />
      <p>{location} - {date}</p>
      <Link to={`/events/${id}`}>Ver detalles</Link>
    </div>
  );
}

export default Event;
