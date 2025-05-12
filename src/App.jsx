import { Routes, Route } from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <div
    className='app-container'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events/:id' element={<EventDetail />} /> {}
      <Route path='/create-event' element={<CreateEvent />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </div>
  );
}

export default App;

