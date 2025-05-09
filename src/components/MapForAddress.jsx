import { useEffect } from 'react';
import L from 'leaflet';
import '../stylesheets/MapForAddress.css'

export default function MapForAddress({ event }) {
  useEffect(() => {
    if (event?.lat && event?.lon) {
      const map = L.map('map-container').setView([event.lat, event.lon], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([event.lat, event.lon])
        .addTo(map)


      // Cleanup al desmontar
      return () => map.remove();
    }
  }, [event]);

  return <div id='map-container'></div>;
}
