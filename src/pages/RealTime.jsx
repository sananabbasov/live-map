import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

const RealTime = () => {
  const [map, setMap] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Initialize the map
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });
    setMap(map);

    // Fetch data from the EONET API using fetch
    fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      .then((response) => response.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from EONET API:', error);
      });
  }, []);

  // Create features for events and add them to the map
  useEffect(() => {
    if (map) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      events.forEach((event) => {
        const coordinates = event.geometries[0].coordinates;
        const feature = new Feature({
          geometry: new Point(fromLonLat(coordinates)),
          name: event.title,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'path-to-your-icon.png', // Customize the icon
            }),
          })
        );
        vectorSource.addFeature(feature);
      });

      map.addLayer(vectorLayer);
    }
  }, [map, events]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default RealTime;
