import { useState } from 'react';
import '../stylesheets/EventForm.css';

const API = import.meta.env.VITE_API_URL;

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    direction: '',
    city: '',
    province: '',
    price:'',
    category: '',
    image: null,  // Para almacenar la imagen seleccionada
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0],  // Asignar el archivo de la imagen
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(`${API}/events`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!res.ok) throw new Error('Error al guardar');

      const data = await res.json();
      console.log('Evento guardado:', data);

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        direction: '',
        city: '',
        province: '',
        price:'',
        category: '',
        image: null,  // Limpiar imagen también
      });

      alert('✅ Evento guardado con éxito');
    } catch (err) {
      console.error(err);
      alert('❌ No se pudo guardar el evento.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form" encType="multipart/form-data">
      <h2>Cargar nuevo evento</h2>
      <input
        type="text"
        name="title"
        placeholder="Título del evento"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <input
        type="text"
        name="direction"
        placeholder="Dirección"
        value={formData.direction}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="province"
        placeholder="Provincia"
        value={formData.province}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Categoría (música, feria, teatro...)"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"  // Solo imágenes
        onChange={handleChange}
      />
      <button type="submit">Guardar evento</button>
    </form>
  );
}
