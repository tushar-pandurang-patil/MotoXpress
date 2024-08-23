import React, { useEffect, useState } from 'react';
import { getCities } from '../services/api'; // Make sure the correct path to api.js is used
import './Footer.css'; // Assuming you create a CSS file for custom styles

const Footer = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const cityData = await getCities();
      setCities(cityData);
    };

    fetchCities();
  }, []);

  return (
    <footer className="footer mt-5 py-4 bg-grey">
      <div className="container text-center text-white">
        <div className="row mb-3">
          <div className="col-12">
            <p>&copy; 2024 MOTOXPRESS. All Rights Reserved.</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <h5>MotoXpress</h5>
            <p>
              <i className="bi bi-envelope-fill"></i> support@motoxpress.com
            </p>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about-us" className="text-white">About Us</a></li>
              <li><a href="/contact-us" className="text-white">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Policies</h5>
            <ul className="list-unstyled">
              <li><a href="/privacy-policy" className="text-white">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <h5>Our Presence</h5>
            <ul className="list-inline">
              {cities.map((city, index) => (
                <li key={index} className="list-inline-item">{city.cityName}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>Made with <span role="img" aria-label="love">❤️</span> by CDAC Team 4</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
