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
import { Box, Modal, Typography } from '@mui/material';


function LocalLocation() {
    const mapRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedMarkerData, setSelectedMarkerData] = useState(null);
    const [places, setPlaces] = useState([]); // State to store marker data

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        // Fetch marker data from http://localhost:3001/markers
        fetch('http://localhost:3001/markers')
            .then(response => response.json())
            .then(data => {
                setPlaces(data); // Update the places array with fetched data

                const map = new Map({
                    target: mapRef.current,
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        })
                    ],
                    view: new View({
                        center: fromLonLat([49.8951, 40.3781]),
                        zoom: 10
                    })
                });

                const vectorSource = new VectorSource();

                data.forEach(place => {
                    const iconFeature = new Feature({
                        geometry: new Point(fromLonLat(place.coordinates))
                    });

                    iconFeature.setProperties({
                        name: place.data.name,
                        description: place.data.description
                    });

                    const iconStyle = new Style({
                        image: new Icon({
                            anchor: [0.5, 0.5],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            scale: 0.03, // Adjust the scale for the smaller marker
                            src: place.iconSrc
                        })
                    });

                    iconFeature.setStyle(iconStyle);

                    vectorSource.addFeature(iconFeature);
                });

                const markerLayer = new VectorLayer({
                    source: vectorSource
                });

                map.addLayer(markerLayer);

                // Add a click event listener for marker clicks
                map.on('click', function (event) {
                    map.forEachFeatureAtPixel(event.pixel, function (feature) {
                        const name = feature.get('name');
                        const description = feature.get('description');

                        setSelectedMarkerData({
                            name: name,
                            description: description
                        });

                        setShowModal(true);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching marker data:', error);
            });
    }, []);

    return (
        <div>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>

            <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Modal
    open={showModal}
    onClose={handleCloseModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2 className="text-2xl font-semibold mb-4">Items Needed for Wildfire Relief</h2>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="max-w-2xl mx-auto p-4">
                <ul className="list-disc pl-4">
                    <li className="mb-2 flex justify-between items-center">
                        <span className="mr-4">Bottled Water</span>
                        <span className="text-gray-600">1L</span>
                    </li>
                    <li className="mb-2 flex justify-between items-center">
                        <span className="mr-4">Non-perishable Food</span>
                        <span className="text-gray-600">6kg</span>
                    </li>
                    <li className="mb-2 flex justify-between items-center">
                        <span className="mr-4">Blankets</span>
                        <span className="text-gray-600">5</span>
                    </li>
                    {/* Add more items with quantity inputs as needed */}
                </ul>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Information</h2>
                <p className="font-semibold mb-2">Name:</p>
                <p className="text-gray-600">{selectedMarkerData?.name}</p> {/* Use the API data here */}
                <p className="font-semibold mb-2">Email:</p>
                <p className="text-gray-600">{selectedMarkerData?.email}</p> {/* Use the API data here */}
                <p className="font-semibold mb-2">Phone:</p>
                <p className="text-gray-600">{selectedMarkerData?.phone}</p> {/* Use the API data here */}
            </div>
        </Typography>
    </Box>
</Modal>

            </Modal>
        </div>
    );
}

export default LocalLocation;
