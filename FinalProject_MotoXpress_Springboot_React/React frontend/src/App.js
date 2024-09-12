import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BikeListPage from './pages/BikeListPage';
import UserListPage from './pages/UserListPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/Home/Home';
import AboutUs from './pages/Home/AboutUs';
import ContactUs from './pages/Home/ContactUs';
import AddBikePage from './pages/AddBikePage';
import EditBikePage from './pages/EditBikePage';
import Bookings from './pages/Bookings';
import ProfilePage from './pages/ProfilePage';
import UserProfile from './components/UserProfile';
import AllBookings from './pages/AllBookings';
import FeedbackButton from './components/FeedbackButton';

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent = () => {
    const location = useLocation();
    const homeAndSpecialPages = ['/', '/about-us', '/contact-us', '/update-profile'];
    const isHomePage = homeAndSpecialPages.includes(location.pathname);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/bikes" element={<BikeListPage />} />
                <Route path="/bikes/edit/:id" element={<EditBikePage />} />
                <Route path="/bikes/addbike" element={<AddBikePage />} /> 
                <Route path="/users" element={<UserListPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/bookings/:id" element={<Bookings />} />
                <Route path="/update-profile" element={<UserProfile />} />
                <Route path="/allbookings" element={<AllBookings />} />
            </Routes>
            <Footer isHomePage={isHomePage} />
        </div>
    );
};

export default App;
