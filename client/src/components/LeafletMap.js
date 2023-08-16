import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import blocks from './../data/data.json';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const LeafletMap = () => {
    const [filters, setFilters] = useState({
        blocks: true,
        hostels: false,
        tutorialRooms: false,
        lectureHalls: false,
        drawingHalls: false,
        labs: false,
    });
    const customIcon = new Icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_01-512.png",
        iconSize: [50, 50],
    })
    const onEachBlock = (feature, layer) => {
        const featureName = feature.properties.name;
        const color = feature.properties.stroke;
        const fillColor = feature.properties.fill;
        const fillOpacity = feature.properties["fill-opacity"];
        const strokeOpacity = feature.properties["stroke-opacity"];
        const strokeWidth = feature.properties["stroke-width"];

        layer.bindPopup(featureName);
        if (feature.geometry.type === 'Point') {
            layer.setIcon(customIcon);
        }
        if (feature.geometry.type !== 'Point') {
            layer.setStyle({
                fillColor: fillColor,
                fillOpacity: fillOpacity,
                color: color,
                strokeOpacity: strokeOpacity,
                weight: strokeWidth,
            });
        }
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const filteredData = blocks.features.filter((feature) => {
        const featureType = feature.properties.type;

        if (
            (featureType === 'block' && filters.blocks) ||
            (featureType === 'hostel' && filters.hostels) ||
            (featureType === 'tutorial_room' && filters.tutorialRooms) ||
            (featureType === 'lecture_hall' && filters.lectureHalls) ||
            (featureType === 'drawing_hall' && filters.drawingHalls) ||
            (featureType === 'lab' && filters.labs)
        ) {
            return true;
        }
        return false;
    });
    const mapContainerStyle = {
        marginLeft: sidebarOpen ? '300px' : '0',
        transition: 'margin-left 1s ease',
        zIndex: '0',
    };
    return (
        <div className='explore-div'>
            <button className="toggle-button primary-button" onClick={() => setSidebarOpen(!sidebarOpen)}>Filters and Search</button>
            <div className={`filter-div ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.blocks}
                            onChange={(e) => setFilters({ ...filters, blocks: e.target.checked })}
                        />
                        Blocks & Landmarks
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={filters.hostels}
                            onChange={(e) => setFilters({ ...filters, hostels: e.target.checked })}
                        />
                        Hostels
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={filters.tutorialRooms}
                            onChange={(e) => setFilters({ ...filters, tutorialRooms: e.target.checked })}
                        />
                        Tutorial Rooms
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={filters.lectureHalls}
                            onChange={(e) => setFilters({ ...filters, lectureHalls: e.target.checked })}
                        />
                        Lecture Halls
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={filters.drawingHalls}
                            onChange={(e) => setFilters({ ...filters, drawingHalls: e.target.checked })}
                        />
                        Drawing Halls
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={filters.labs}
                            onChange={(e) => setFilters({ ...filters, labs: e.target.checked })}
                        />
                        Labs
                    </label></div>
            </div>
            <div className='map-container' style={mapContainerStyle}>
                <MapContainer center={[30.766562, 76.786563]} zoom={17} maxZoom={25}>
                    <TileLayer
                        maxZoom={25}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* <GeoJSON data={filteredData} onEachFeature={onEachBlock} /> */}
                    <GeoJSON key={JSON.stringify(filters)} data={filteredData} onEachFeature={onEachBlock} />
                </MapContainer>
            </div>
        </div>
    );
};

export default LeafletMap;
