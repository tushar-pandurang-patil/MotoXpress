import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import BikeListBook from '../components/BikeListBook';
import { getCities } from '../services/api';
import './Bikes.css';
import Footer from '../components/Footer';

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortType, setSortType] = useState('relevance');
  const [pickupCityId, setPickupCityId] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchBikes();
  }, [pickupCityId]);

  const fetchCities = async () => {
    try {
      const citiesData = await getCities();
      setCities(citiesData);
    } catch (error) {
      console.error('Error fetching cities!', error);
    }
  };

  const fetchBikes = async () => {
    try {
      // Adjust the API call based on whether a city is selected or not
      const url = pickupCityId ? `https://localhost:7270/api/Bikes?pickupCityId=${pickupCityId}` : 'https://localhost:7270/api/Bikes';
      const response = await axiosInstance.get(url);
      setBikes(response.data);
    } catch (error) {
      console.error('Error fetching bikes!', error);
    }
  };

  const filteredBikes = bikes.filter(bike =>
    bike.bikeName.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedBikes = filteredBikes.sort((a, b) => {
    if (sortType === 'price-low-high') return a.perDayRental - b.perDayRental;
    if (sortType === 'price-high-low') return b.perDayRental - a.perDayRental;
    if (sortType === 'alphabetically-az') return a.bikeName.localeCompare(b.bikeName);
    if (sortType === 'alphabetically-za') return b.bikeName.localeCompare(a.bikeName);
    return 0;
  });

  return (
    <div className="bikes-page container">
      <div className="row mt-1 justify-content-center">
      <div className="col-md-6">
          <label>Pickup City</label>
          <select
            className="form-control"
            value={pickupCityId}
            onChange={(e) => setPickupCityId(e.target.value)}
          >
            <option value="">Select Pickup City</option>
            {cities.map(city => (
              <option key={city.cityId} value={city.cityId}>
                {city.cityName}
              </option>
            ))}
          </select>
          </div>
          <div className="col-md-6 mt-4">
          <input
              type="text"
              placeholder="Filter by Bike Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="form-control"
            />
      </div>
      </div>
      <div className="row mt-1 justify-content-center">
        <div className="col-auto d-flex justify-content-center">
          <div className="sidebar">
            <div className="col-auto sort-tabs mt-1">
              <span
                className={sortType === 'relevance' ? 'active' : ''}
                onClick={() => setSortType('relevance')}
              >
                Relevance
              </span>
              <span
                className={sortType === 'price-low-high' ? 'active' : ''}
                onClick={() => setSortType('price-low-high')}
              >
                Price - Low to High
              </span>
              <span
                className={sortType === 'price-high-low' ? 'active' : ''}
                onClick={() => setSortType('price-high-low')}
              >
                Price - High to Low
              </span>
              <span
                className={sortType === 'alphabetically-az' ? 'active' : ''}
                onClick={() => setSortType('alphabetically-az')}
              >
                A-Z
              </span>
              <span
                className={sortType === 'alphabetically-za' ? 'active' : ''}
                onClick={() => setSortType('alphabetically-za')}
              >
                Z-A
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bike-cards-container mt-4">
      <BikeListBook bikes={sortedBikes} />
      </div>
    </div>
  );
};

export default Bikes;
