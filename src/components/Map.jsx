import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/Map.css';

function Map() {
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // Mantener el marcador

  useEffect(() => {
    const mapInstance = L.map('map', {
      center: [-34.540278, -58.481667], 
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            if (map) {
              map.panTo([latitude, longitude]); // Centra el mapa en la ubicación

              // Si no hay marcador, creamos uno
              if (!marker) {
                const newMarker = L.marker([latitude, longitude], {
                  icon: L.divIcon({
                    className: 'location-icon',
                    html: `<div class="marker"></div>`,
                  }),
                }).addTo(map);
                setMarker(newMarker); // Guardamos el marcador en el estado
              } else {
                marker.setLatLng([latitude, longitude]); // Actualiza la posición del marcador existente
              }
            }
          },
          (error) => {
            if (error.code === 3) {
              setError('Tiempo de espera agotado para obtener la ubicación.');
            } else {
              setError('Error al obtener la ubicación.');
            }
            console.error(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,  
            maximumAge: 0,
          }
        );
      }, 10000); 

      return () => clearInterval(intervalId); // Limpiar el intervalo cuando se desmonta el componente
    } else {
      setError('Geolocalización no está soportada en este navegador.');
    }
  }, [map, marker]); // La dependencia del marcador asegura que se actualice su posición

  return (
    <div>
      <div id="map" style={{ height: '500px' }}></div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}

export default Map;