import '../stylesheets/Events.css';
import Event from './Event.jsx';

function EventCard() {
  const events = [
    {
      id: "001",
      title: "Taller de Yoga",
      date: "2025-05-12",
      location: "Palermo",
      time: '19:00'
    },
    {
      id: "002",
      title: "Noche de Reiki",
      date: "2025-05-15",
      location: "Belgrano",
      time: '19:00'
    },
    {
      id: "003",
      title: "Ceremonia de Luna Llena",
      date: "2025-05-20",
      location: "Palermo",
      time: '19:00'
    },
    {
      id: "004",
      title: "Meditación Sonora",
      date: "2025-05-22",
      location: "Belgrano",
      time: '19:00'
    }
  ];

  return (
    <>
      {events.map((event) => (
        <Event
          key={event.id} 
          id={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          time={event.time}
        />
      ))}
    </>
  );
}

export default EventCard;