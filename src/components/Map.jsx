import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/Map.css';

function Map({ events }) {
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // Mantener el marcador

  const getCategoryIcon = (category) => {
    const letterMap = {
      musica: "M",
      teatro: "T",
      gastronomia: "G",
      danza: 'Da',
      feria: 'F',
      deporte: 'De',
      cine: 'Ci',
      pintura: 'P',
      charla: 'Ch',
    };
  
    // Obtener la letra correspondiente para la categoría
    const letter = letterMap[category.toLowerCase()] || "?";
  
    // Crear el ícono con la clase de la categoría para aplicar el estilo correspondiente
    return L.divIcon({
      html: `<div class="custom-marker ${category.toLowerCase()}">${letter}</div>`,
      className: "",
      iconSize: [20, 20], // Ajustado a un tamaño más adecuado
      iconAnchor: [10, 20], // Alineación centrada en la parte inferior
    });
  };



  useEffect(() => {
    const mapInstance = L.map('map', {
      center: [-34.540278, -58.481667], 
      zoom: 13,
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    
    mapRef.current = mapInstance; // ✅ esto te faltaba
    setMap(mapInstance);
  
    return () => {
      mapInstance.remove();
    };
  }, []);


  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !events || events.length === 0) return;
  
    const map = mapRef.current;
  
    const markerGroup = L.layerGroup().addTo(map);
  
    events.forEach((event) => {
      if (
        typeof event.lat === 'number' &&
        typeof event.lon === 'number' &&
        !isNaN(event.lat) &&
        !isNaN(event.lon)
      ) {
        L.marker([event.lat, event.lon], {
          icon: getCategoryIcon(event.category),
        }).addTo(markerGroup);
      } else {
        console.warn("Evento con coordenadas inválidas:", event);
      }
    });
  
    return () => {
      map.removeLayer(markerGroup);
      console.log(markerGroup);
    };
  }, [events]);
  
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
      <div id="map"></div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );



}

export default Map;