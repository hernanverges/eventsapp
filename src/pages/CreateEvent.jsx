import EventForm from '../components/EventForm/EventForm.jsx';
import Header from '../components/Header/Header.jsx';

export default function CreateEvent() {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <EventForm />
      </main>
    </>
  );
}