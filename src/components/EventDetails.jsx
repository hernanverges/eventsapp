import '../stylesheets/Events.css';

function EventDetails({ id, title, date, description, time, address, city, province, price, category }) {

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
      <p>📍 {address}, {city} - {province}</p>
      <p>🏷️ ${price}</p>
      <p>🗓️ {date}</p>
      <p>🕒 {time}</p>
    </div>
  );
}

export default EventDetails;
