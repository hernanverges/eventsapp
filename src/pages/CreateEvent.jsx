import EventForm from '../components/EventForm';
import Header from '../components/Header';

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