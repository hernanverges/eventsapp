import './EventDetails.css';
import LikeButton from '../LikeButton/LikeButton.jsx';

function EventDetails({ id, title, date, description, time, address, city, province, price, category }) {

  return (
    <div className='event-detail-card'>
      <div className="ribbon"><span>{category}</span></div>
      <LikeButton className='like-button' eventId={id}/>
      <img 
        className='event-detail-image'
        src={`../src/uploads/${id}.png`} 
        alt={`Imagen de ${title}`} 
      />

      <h2>{title}</h2>

      <div className='event-description'>
        <p>{description}</p>
      </div>
      <p>📍 {address}, {city} - {province}</p>
      <p>🏷️ {price}</p>
      <p>🗓️ {date}</p>
      <p>🕒 {time}</p>
    </div>
  );
}

export default EventDetails;
