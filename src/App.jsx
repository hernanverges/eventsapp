import { Routes, Route } from 'react-router-dom';
import EventDetail from './components/EventDetail';
import EventCard from './components/EventCard';
import Home from './pages/Home';

function App() {
  return (
    <div
    className="app-container">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos/:id" element={<EventDetail />} /> {/* Ruta de detalle de evento */}
    </Routes>
    </div>
  );
}

export default App;

