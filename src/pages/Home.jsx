import events from '../data/events.json';
import EventCard from '../components/EventCard'; // Para mostrar cada evento de manera individual
import '../stylesheets/App.css';
import '../stylesheets/Map.css';
import Map from '../components/Map.jsx'
import Header from '../components/Header.jsx'

function Home() {
  return (
    <div className='home-container'>
      <Header></Header>
      <div className="events-list">
        {events.map((evento) => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </div>

      <div className='map-container'>
        <Map />
      </div>
    </div>
  );
}

export default Home;