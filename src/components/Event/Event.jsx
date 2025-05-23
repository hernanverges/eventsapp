import { Link } from 'react-router-dom';
import './Events.css';
import LikeButton from '../LikeButton/LikeButton.jsx';

function Event({ id, title, date, time, address, city, province, price, category }) {

  return (
    <div className='event-card'>
      <div className='ribbon'><span>{category}</span></div>
      <LikeButton className='like-button' eventId={id}/>
      <img 
        className='event-image'
        src={`../src/uploads/${id}.png`} 
        alt={`Imagen de ${title}`} 
      />
      <div className='title-container'><h2> {title} </h2></div>
      <p>📍 {address}, {city} - {province}</p>
      <p>🏷️ {price}</p>
      <p>🗓️ {date}</p>
      <p>🕒 {time}</p>

    <div className='link-container'>
      <Link to={`/events/${id}`}>Ver detalles</Link>
    </div>
  </div>
  );
}

export default Event;
