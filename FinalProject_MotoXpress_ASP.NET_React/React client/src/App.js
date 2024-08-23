import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NavigationBar from './components/Navbar';
import CRUDBikes from './pages/CRUDBikes';
import Bikes from './pages/Bikes';
import Bookings from './pages/Bookings';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import PastApprovals from './pages/PastApprovals';
import PendingApprovals from './pages/PendingApprovals';
import RentalRecordspage from './pages/RentalRecordspage';
import Users from './pages/Users';
import Profile from './pages/Profile';

function App() {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserRole(role);
        }
    }, []);

    const RequireAuth = ({ children, roles }) => {
        if (!localStorage.getItem('token')) {
            return <Navigate to="/login" />;
        }

        if (roles && !roles.includes(userRole)) {
            return <Navigate to="/" />;
        }

        return children;
    };

    return (
        <div className="App">
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/bikes" element={<Bikes />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/about-us" element={<AboutUs />} />

                    {/* Admin Routes */}
                    <Route
                        path="/crudbikes"
                        element={
                            <RequireAuth roles={['admin']}>
                                <CRUDBikes />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/rentalrecordspage"
                        element={
                            <RequireAuth roles={['admin']}>
                                <RentalRecordspage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <RequireAuth roles={['admin']}>
                                <Users />
                            </RequireAuth>
                        }
                    />

                    {/* Shared Admin and Approver Routes */}
                    <Route
                        path="/past-approvals"
                        element={
                            <RequireAuth roles={['admin', 'approver']}>
                                <PastApprovals />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/pending-approvals"
                        element={
                            <RequireAuth roles={['admin', 'approver']}>
                                <PendingApprovals />
                            </RequireAuth>
                        }
                    />

                    {/* User Routes */}
                    <Route
                        path="/bookings"
                        element={
                            <RequireAuth>
                                <Bookings />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
