import './EventCard.css';
import Event from '../Event/Event.jsx';
import EventDetails from '../EventDetails/EventDetails.jsx';

function EventCard({ event, isDetail }) {
  function capitalize(str) {
    if (typeof str !== 'string' || !str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const formattedDate = new Date(event.date).toLocaleDateString('es-AR', {
    weekday: 'long', 
    day: '2-digit',  
    month: 'long',  
    year: 'numeric'
  });

  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const displayPrice =
  Number(event.price) === 0
    ? '¡GRATIS!'
    : `$ ${new Intl.NumberFormat('es-AR').format(event.price)}`;

  return (
  
    isDetail ? 
    <EventDetails
      key={event._id} 
      id={event._id}
      title={event.title}
      date={capitalizedDate}
      description={event.description}
      address={capitalize(event.address)}
      city={capitalize(event.city)}
      province={capitalize(event.province)}
      price={displayPrice}
      time={event.time}
      category={event.category}
    />

    :

    <>
    <Event
      key={event._id} 
      id={event._id}
      title={event.title}
      date={capitalizedDate}
      description={event.description}
      address={capitalize(event.address)}
      city={capitalize(event.city)}
      province={capitalize(event.province)}
      price={displayPrice}
      time={event.time}
      category={event.category}
    />
    </>
  );
}

export default EventCard;
