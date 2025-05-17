import { useState } from 'react';
import './EventForm.css';
import MapForAddress from '../MapForAddress/MapForAddress'; 

const API = import.meta.env.VITE_API_URL;

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    address: '',
    city: '',
    province: '',
    price: '',
    category: '',
    image: null,
  });

  const [location, setLocation] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const verifyAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=AR&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length === 0) {
        alert('La dirección no es válida.');
        return null;
      }

      const { lat, lon, display_name } = data[0];
      return { lat, lon, display_name };
    } catch (error) {
      console.error('Error al verificar la dirección:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullAddress = `${formData.address}, ${formData.city}, ${formData.province}, Argentina`;
    const locationData = await verifyAddress(fullAddress);

    if (locationData) {
      setLocation(locationData);
      setShowConfirmModal(true); 
    }
  };

  const confirmAndSend = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    }

    if (location) {
      formDataToSend.append('lat', location.lat);
      formDataToSend.append('lon', location.lon);
    }

    try {
      const res = await fetch(`${API}/events`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!res.ok) throw new Error('Error al guardar el evento');

      const data = await res.json();
      console.log('Evento guardado:', data);

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        address: '',
        city: '',
        province: '',
        price: '',
        category: '',
        image: null,
      });

      setLocation(null);
      setShowConfirmModal(false);
      alert('✅ Evento guardado con éxito');
    } catch (err) {
      console.error(err);
      alert('❌ No se pudo guardar el evento.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='event-form' encType='multipart/form-data'>
        <h2>Cargar nuevo evento</h2>
        <input type='text' name='title' placeholder='Título del evento' value={formData.title} onChange={handleChange} required />
        <textarea name='description' placeholder='Descripción' value={formData.description} onChange={handleChange} />
        <div className='row'>
          <input type='date' name='date' value={formData.date} onChange={handleChange} required />
          <input type='time' name='time' value={formData.time} onChange={handleChange} required />
        </div>
        <input type='text' name='address' placeholder='Dirección' value={formData.address} onChange={handleChange} required />
        <input type='text' name='city' placeholder='Ciudad' value={formData.city} onChange={handleChange} required />
        <input type='text' name='province' placeholder='Provincia' value={formData.province} onChange={handleChange} required />
        <input type='number' name='price' placeholder='Precio' value={formData.price} onChange={handleChange} required step='1' min='0' />
        <select name='category' value={formData.category} onChange={handleChange}>
          <option value=''>Seleccioná una categoría</option>
          <option value='Musica'>Música</option>
          <option value='Teatro'>Teatro</option>
          <option value='Feria'>Feria</option>
          <option value='Deporte'>Deporte</option>
          <option value='Fiesta'>Fiesta</option>
          <option value='Cine'>Cine</option>
          <option value='Danza'>Danza</option>
          <option value='Pintura'>Pintura</option>
          <option value='Charla'>Charla/Taller</option>
          <option value='Gastronomia'>Gastronomía</option>
        </select>
        <input type='file' name='image' accept='image/*' onChange={handleChange} />
        <button type='submit'>Guardar evento</button>
      </form>

      {showConfirmModal && location && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>¿Es correcta esta ubicación?</h3>
            <MapForAddress event={{ lat: location.lat, lon: location.lon }} />
            <div className='modal-actions'>
              <button className='confirm' onClick={confirmAndSend}>Sí, es correcta</button>
              <button className='cancel' onClick={() => setShowConfirmModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
