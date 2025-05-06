import '../stylesheets/Events.css';

function EventDetails({ id, title, date, description, time, direction, city, province, price, category }) {

  return (
    <div className='event-detail-card'>
      <img 
        className='event-detail-image'
        src={`../src/uploads/${id}.png`} 
        alt={`Imagen de ${title}`} 
      />

      <h2>{title}</h2>

      <div className='event-description'>
        <p>{description}</p>
      </div>
      <p>📍 {direction}, {city} - {province}</p>
      <p>🏷️ ${price}</p>
      <p>🗓️ {date} - 🕒 {time}</p>
    </div>
  );
}

export default EventDetails;
