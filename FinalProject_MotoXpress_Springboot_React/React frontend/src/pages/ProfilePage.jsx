import React from 'react';
import UserProfile from '../components/UserProfile';
import '../assets/video2.mp4';

const ProfilePage = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <video
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
                autoPlay
                muted
                loop
            >
                <source src={require('../assets/video2.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div style={{ position: 'relative', zIndex: '1' }}>
                <UserProfile />
            </div>
        </div>
    );
};

export default ProfilePage;
