import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';

function FireMap() {
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([49.8951, 40.3781]),
        zoom: 3, // Adjust the zoom level as needed
      }),
    });

    const vectorSource = new VectorSource();

    // Fetch data from NASA EONET API for wildfire events
    fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
      .then((response) => response.json())
      .then((data) => {
        // Filter events to get only the "wildfire" category
        const wildfireEvents = data.events.filter((event) =>
          event.categories.some((category) => category.title === 'Wildfires')
        );

        wildfireEvents.forEach((event) => {
          const coordinates = [
            event.geometries[0].coordinates[0],
            event.geometries[0].coordinates[1],
          ];
          const eventName = event.title;
          const eventDescription = event.description;

          const iconFeature = new Feature({
            geometry: new Point(fromLonLat(coordinates)),
          });

          iconFeature.setProperties({
            name: eventName,
            description: eventDescription,
          });

          const iconStyle = new Style({
            image: new Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              src: 'https://cdn.pixabay.com/photo/2014/04/02/11/01/fire-305227_1280.png', // Change this to your marker image URL
              scale: 0.01, // Adjust the scale for the smaller marker
            }),
          });

          iconFeature.setStyle(iconStyle);

          vectorSource.addFeature(iconFeature);
        });

        const markerLayer = new VectorLayer({
          source: vectorSource,
        });

        map.addLayer(markerLayer);
      })
      .catch((error) => {
        console.error('Error fetching data from NASA EONET API:', error);
      });

    // Add a click event listener for marker clicks
    map.on('click', function (event) {
      map.forEachFeatureAtPixel(event.pixel, function (feature) {
        const name = feature.get('name');
        const description = feature.get('description');

        setSelectedMarkerData({
          name: name,
          description: description,
        });

        setShowModal(true);
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}

export default FireMap;
