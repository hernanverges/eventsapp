import { useEffect } from 'react';
import L from 'leaflet';

export default function MapForAddress({ lat, lon }) {
  useEffect(() => {
    if (lat && lon) {
      const map = L.map('map-address').setView([lat, lon], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup('Ubicación del evento').openPopup();

      // Cleanup
      return () => map.remove();
    }
  }, [lat, lon]);

  return <div id="map-address" style={{ height: '300px', marginTop: '1rem' }}></div>;
}