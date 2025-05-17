import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

function Map({ events }) {
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const hasCenteredMap = useRef(false); // 👈 para centrar una sola vez

  // Icono por categoría
  const getCategoryIcon = (category) => {
    const letterMap = {
      musica: 'M',
      teatro: 'T',
      gastronomia: 'G',
      danza: 'Da',
      feria: 'Fe',
      fiesta: 'Fi',
      deporte: 'De',
      cine: 'Ci',
      pintura: 'P',
      charla: 'Ch',
    };

    const letter = letterMap[category.toLowerCase()] || '?';

    return L.divIcon({
      html: `<div class='custom-marker ${category.toLowerCase()}'>${letter}</div>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 20],
    });
  };

  // Inicializa el mapa
  useEffect(() => {
    const mapInstance = L.map('map', {
      center: [-34.540278, -58.481667],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    mapRef.current = mapInstance;

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Agrega marcadores de eventos
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
        console.warn('Evento con coordenadas inválidas:', event);
      }
    });

    return () => {
      map.removeLayer(markerGroup);
    };
  }, [events]);

  // Geolocalización del usuario
  useEffect(() => {
    if (!navigator.geolocation || !mapRef.current) {
      setError('Geolocalización no disponible');
      return;
    }

    const map = mapRef.current;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Centrar solo una vez
        if (!hasCenteredMap.current) {
          map.panTo([latitude, longitude]);
          hasCenteredMap.current = true;
        }

        if (!userMarkerRef.current) {
          const newMarker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'location-icon',
              html: `<div class='marker'></div>`,
            }),
          }).addTo(map);
          userMarkerRef.current = newMarker;
        } else {
          userMarkerRef.current.setLatLng([latitude, longitude]);
        }
      },
      (err) => {
        if (err.code === 3) {
          setError('Tiempo de espera agotado para obtener la ubicación.');
        } else {
          setError('Error al obtener la ubicación.');
        }
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <div id='map'></div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}

export default Map;
