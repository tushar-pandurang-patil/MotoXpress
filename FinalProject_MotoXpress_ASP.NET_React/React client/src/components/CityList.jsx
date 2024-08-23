// src/components/CityList.js
import React, { useState, useEffect } from 'react';

const CityList = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetch('/api/cities')
            .then(response => response.json())
            .then(data => setCities(data));
    }, []);

    return (
        <div>
            <h1>City List</h1>
            <ul>
                {cities.map(city => (
                    <li key={city.cityId}>{city.cityName}</li>
                ))}
            </ul>
        </div>
    );
};

export default CityList;
