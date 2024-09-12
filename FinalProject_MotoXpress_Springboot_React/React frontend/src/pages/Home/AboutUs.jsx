import React from 'react';
import video2 from '../../assets/video2.mp4'; // Import video file

const AboutUs = () => {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
    }}>
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(50%)' // Darkens the video for better contrast
        }}
      >
        <source src={video2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{
        position: 'relative',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker for better contrast
        padding: '40px',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: '20px auto',
        textAlign: 'center',
        overflowY: 'auto',
        height: 'auto', // Adjust height to fit content
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{
          marginBottom: '20px',
          fontSize: '2.5em',
          fontWeight: 'bold',
          color: '#ffffff'
        }}>
          About Us
        </h2>
        <p style={{
          lineHeight: '1.6',
          fontSize: '1.1em',
          marginBottom: '20px'
        }}>
          Welcome to our premier bike rental platform, where every ride transforms into an unforgettable adventure. At MOTOXPRESS, we are passionate about connecting riders with their perfect bikes, catering to every cycling need and aspiration. Whether you're craving the rush of speeding down mountain trails, the exhilaration of a swift road journey, or the ease of gliding through city streets on an electric bike, we have the ideal set of wheels waiting for you.
        </p>
        <p style={{
          lineHeight: '1.6',
          fontSize: '1.1em',
          marginBottom: '20px'
        }}>
          Our extensive fleet showcases a diverse selection of top-quality bikes, meticulously maintained to guarantee your safety, comfort, and pure enjoyment. Each bike is meticulously inspected and serviced after every rental, ensuring peak performance and reliability on every ride. We take pride in offering flexible rental periods, competitive rates, and seamless online booking, making it effortless for you to plan your biking escapades with ease.
        </p>
        <p style={{
          lineHeight: '1.6',
          fontSize: '1.1em',
          marginBottom: '20px'
        }}>
          At MOTOXPRESS, we prioritize your convenience and peace of mind. Our commitment to customer satisfaction is unwavering, backed by 24/7 dedicated support to assist you at any stage of your rental journey. For your safety, we provide helmet and accessory rentals, ensuring that you have everything you need for a secure and enjoyable biking experience.
        </p>
        <p style={{
          lineHeight: '1.6',
          fontSize: '1.1em',
          marginBottom: '20px'
        }}>
          Explore our user-friendly website, where booking your dream bike is just a few clicks away. Our secure online payment system guarantees a hassle-free transaction process, so you can focus on gearing up for your next adventure with confidence.
        </p>
        <p style={{
          lineHeight: '1.6',
          fontSize: '1.1em',
          marginBottom: '20px'
        }}>
          Whether you're a seasoned cyclist seeking a specific bike model or a novice eager to explore the world of biking, MOTOXPRESS is here to make your ride exceptional. Join us today and discover why we are the preferred choice for bike rentals among enthusiasts and casual riders alike. Let's pedal towards new horizons together!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
