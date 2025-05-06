import { Link } from 'react-router-dom';
import '../stylesheets/Events.css';

function Event({ id, title, date, time, direction, city, province, price, category }) {

  return (
    <div className='event-card'>
      <img 
        className='event-image'
        src={`../src/uploads/${id}.png`} 
        alt={`Imagen de ${title}`} 
      />
      <h2> {title} </h2>
      <p>📍 {direction}, {city} - {province}</p>
      <p>🏷️ ${price}</p>
      <p>🗓️ {date} - 🕒 {time}</p>

      <Link to={`/events/${id}`}>Ver detalles</Link>
    </div>
  );
}

export default Event;
