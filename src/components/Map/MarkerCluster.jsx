import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define your custom JSX marker component
const CustomMarkerComponent = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    mcg.clearLayers();
    markers.forEach(({ position, name, data }) => {
      L.marker(new L.LatLng(position[0], position[1]), {
        icon: L.divIcon({
          html: ReactDOMServer.renderToString(
            <CustomMarkerComponent />
          ),
          className: "custom-marker-icon",
          iconSize: [300, 150], // Adjust size as needed
          iconAnchor: [50, 50], // Adjust anchor point if necessary
        }),
      }).addTo(mcg);
    });

    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
