import { useEffect, useState } from 'react';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error al obtener perfil');
        }
      } catch (error) {
        console.error('Error en la solicitud', error);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Perfil de usuario</h2>
      <p><strong>Nombre:</strong> {userData.user}</p>
      <p><strong>Email:</strong> {userData.mail}</p>
    </div>
  );
}
