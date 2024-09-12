import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BikeService from '../services/BikeService';
import BikeCard from '../components/BikeCard';
import BackgroundImage from '../assets/bgbg12.jpeg'; // Add the background image path

const BikeListPage = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [sortOrder, setSortOrder] = useState('a-z');
  const [filterName, setFilterName] = useState('');
  const [userRole, setUserRole] = useState(''); // State to store user role
  const navigate = useNavigate();

  useEffect(() => {
    fetchBikes();
    // Retrieve user role from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    let updatedBikes = bikes.filter(bike =>
      bike.bikeName.toLowerCase().includes(filterName.toLowerCase())
    );

    if (sortOrder === 'a-z') {
      updatedBikes = updatedBikes.sort((a, b) => a.bikeName.localeCompare(b.bikeName));
    } else if (sortOrder === 'z-a') {
      updatedBikes = updatedBikes.sort((a, b) => b.bikeName.localeCompare(a.bikeName));
    } else if (sortOrder === 'price-low-high') {
      updatedBikes = updatedBikes.sort((a, b) => a.perDayRental - b.perDayRental);
    } else if (sortOrder === 'price-high-low') {
      updatedBikes = updatedBikes.sort((a, b) => b.perDayRental - a.perDayRental);
    }

    setFilteredBikes(updatedBikes);
  }, [bikes, sortOrder, filterName]);

  const fetchBikes = async () => {
    try {
      const response = await BikeService.getAllBikes();
      setBikes(response.data);
    } catch (error) {
      console.error('Failed to fetch bikes:', error);
    }
  };

  const handleAddBikeClick = () => {
    navigate('/bikes/addbike');
  };

  const deleteBike = async (id) => {
    try {
      await BikeService.deleteBike(id);
      fetchBikes();
    } catch (error) {
      console.error('Failed to delete bike:', error);
    }
  };

  const handleEdit = (bike) => {
    navigate(`/bikes/edit/${bike.bikeId}`);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa', // Light background color
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${BackgroundImage})`, // Add the background image path
    backgroundSize: 'cover', // Ensure the image covers the entire area
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
  };

  const mainContentStyle = {
    width: '100%',
    maxWidth: '1200px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a white background with some transparency
    borderRadius: '10px', // Rounded corners
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
  };

  const buttonStyle = {
    marginBottom: '20px',
    padding: '12px 24px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const filterStyle = {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    width: '100%',
  };

  const sortStyle = {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    width: '100%',
  };

  const bikeCardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const bikeCardStyle = {
    margin: '10px',
    flex: '1 1 calc(33.333% - 20px)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    transition: 'transform 0.3s ease',
  };

  const handleCardHover = (event) => {
    event.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleCardHoverOut = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        <h2 style={headingStyle}>Bikes Management</h2>
        {userRole === 'ADMIN' && (
          <button
            onClick={handleAddBikeClick}
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Add Bike
          </button>
        )}
        <div>
          <input
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={filterStyle}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={sortStyle}
          >
            <option value="a-z">Sort by Name: A-Z</option>
            <option value="z-a">Sort by Name: Z-A</option>
            <option value="price-low-high">Sort by Price: Low to High</option>
            <option value="price-high-low">Sort by Price: High to Low</option>
          </select>
        </div>
        <h2 style={headingStyle}>Available Bikes</h2>
        <div style={bikeCardContainerStyle}>
          {filteredBikes.map((bike) => (
            <div
              key={bike.bikeId}
              style={bikeCardStyle}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardHoverOut}
            >
              <BikeCard
                bike={bike}
                onDelete={() => deleteBike(bike.bikeId)}
                onEdit={() => handleEdit(bike)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeListPage;
