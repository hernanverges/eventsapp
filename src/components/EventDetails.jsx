import '../stylesheets/Events.css';

function EventDetails({ id, title, date, description, time, direction, city, province, price, category }) {

  return (
    <div className='event-detail-card'>
      <h2>{title}</h2>
      <img 
        className='event-detail-image'
        src={`../src/uploads/${id}.png`} 
        alt={`Imagen de ${title}`} 
      />
      <div className='event-description'>
        <p>{description}</p>
      </div>
      <p>📍 {direction}, {city} - {province}</p>
      <p>🗓️ {date}</p>
      <p>🕒 {time}</p>
    </div>
  );
}

export default EventDetails;
