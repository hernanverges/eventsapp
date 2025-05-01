import { useParams } from 'react-router-dom';
import events from '../data/events.json';
import '../stylesheets/Events.css';

function EventDetail() {
  const { id } = useParams(); // Obtener el id del evento desde la URL
  const evento = events.find((evento) => evento.id === id); // Buscar el evento por su id

  if (!evento) {
    return <h2>Evento no encontrado</h2>;
  }

  return (
    <div>
      <h1>{evento.titulo}</h1>
      <p>{evento.barrio} - {evento.fecha}</p>
      <p>{evento.descripcion}</p>
    </div>
  );
}

export default EventDetail;