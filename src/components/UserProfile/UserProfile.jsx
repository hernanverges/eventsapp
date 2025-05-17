import { useEffect, useState } from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  const clearLocalStorage = () => {
    localStorage.clear();
  }

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

    <div className='userprofile-container'>
        <div className='usernav-container'>
            <nav>Eventos</nav>
        </div>
        <div className='userdata-container'>
            <h2>Perfil de usuario</h2>
            <p className='name-title'>Nombre:</p> <p className='name-data'>{userData.user}</p>
            <p className='email-title'>Email:</p> <p className='mail-data' >{userData.mail}</p>
            <Link onClick={ clearLocalStorage } to='/'>Salir</Link>
        </div>
    </div>
  );
}
