import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import blocks from '../../data/data.json';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import "./explorestyles.css";

const LeafletMap = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBounds, setSelectedBounds] = useState();
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (selectedBounds) {
            const map = mapRef.current;
            map.fitBounds(selectedBounds);
        }
    }, [selectedBounds]);

    const [filters, setFilters] = useState({
        blocks: true,
        hostels: true,
        tutorialRooms: true,
        lectureHalls: true,
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
        layer.on('click', () => {
            setSelectedResult(feature);
        });
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth > 768);
            setIsMobileScreen(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setSearchResults([])
        } else {
            const filtered = blocks.features.filter((feature) => feature.properties.name.toLowerCase().includes(query.toLowerCase()));
            setSearchResults(filtered);
        }
    };

    const resetFilters = (value) => {
        const newFilters = {
            blocks: value,
            hostels: value,
            tutorialRooms: value,
            lectureHalls: value,
            drawingHalls: value,
            labs: value,
        };
        mapRef.current.setView([30.766562, 76.786563],17)
        setFilters(newFilters);
    };

    const handleResultClick = (result) => {
        const geometry = result.geometry
        if (geometry.type === 'Point') {
            const coordinates = geometry.coordinates;
            const latLng = [coordinates[1], coordinates[0]];
            const map = mapRef.current;
            setSelectedFeature(result);
            resetFilters(false);
            setSelectedResult(result);
            map.setView(latLng, 19);
        }
        if (geometry.type === 'Polygon') {

            const coordinates = geometry.coordinates[0];
            const latLngs = coordinates.map(coord => [coord[1], coord[0]]);
            setSelectedFeature(result);
            resetFilters(false);
            setSelectedResult(result);
            setSelectedBounds(latLngs);
        }
    };

    const mapContainerStyle = {
        marginLeft: sidebarOpen ? (isMobileScreen ? '0' : '300px') : '0',
        transition: 'margin-left 1s ease',
        zIndex: '0',
    };

    const filteredData = selectedFeature ? selectedFeature : blocks.features.filter((feature) => {
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
    return (
        <div className='explore-div'>
            {!sidebarOpen && <button className="open-button primary-button" onClick={() => setSidebarOpen(true)}>Filters and Search</button>}
            <div className={`filter-div ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={() => setSidebarOpen(false)}>&times; Close</button>
                <div className="sidebar-content">
                    {selectedResult ? (
                        <div className="detailed-description">
                            <h3>{selectedResult.properties.name}</h3>
                            <p>{selectedResult.properties.desc}</p>
                            <button className="close-description" onClick={() => { resetFilters(true); setSelectedResult(null); setSelectedFeature(null) }}>&times;</button>
                        </div>
                    ) :
                        (<div> <div className='search-div'><input type='text' className='search-bar' value={searchQuery} placeholder='Search...' onChange={(e) => handleSearch(e.target.value)} /> <button className="clear-button" onClick={() => { setSearchQuery(""); setSearchResults([]) }}>CLEAR</button></div>
                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map((result, index) => (
                                        <div
                                            key={index}
                                            className="search-result"
                                            onClick={() => handleResultClick(result)}
                                        >
                                            <h3>{result.properties.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        )}
                    <div className={`filter-labels-div ${selectedResult || searchQuery ? "closed" : ""}`}>
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
                        </label></div></div>
            </div>
            <div className='map-container' style={mapContainerStyle}>
                <MapContainer ref={mapRef} center={[30.766562, 76.786563]} zoom={17} maxZoom={25}>
                    <TileLayer
                        maxZoom={25}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <GeoJSON key={JSON.stringify(filters)} data={filteredData} onEachFeature={onEachBlock} />
                </MapContainer>
            </div>
        </div>
    );
};

export default LeafletMap;
