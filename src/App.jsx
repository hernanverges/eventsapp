import { Routes, Route } from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import UserEvents from './components/UserEvents/UserEvents.jsx';

function App() {
  return (
    <div
    className='app-container'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events/:id' element={<EventDetail />} /> 
      <Route path='/create-event' element={<CreateEvent />} />

      <Route path="/profile" element={<Profile />}>
          <Route index element={<UserProfile />} />
          <Route path="events" element={<UserEvents />} /> 
      </Route>

    </Routes>
    </div>
  );
}

export default App;

