import React from 'react';
import video2 from '../../assets/video2.mp4';

const HomePage = () => {
  return (
    <div className="home-page">
      <video autoPlay loop muted className="video-background">
        <source src={video2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1 className="display-4">Welcome to MotoXpress</h1>
        <p className="lead">Your trusted partner for bike rentals. Discover, rent, and ride with ease.</p>
        <a href="/bikes" className="btn btn-custom">Browse Our Bikes</a>
      </div>

      <div className="container text-center my-5 section">
        <h2 className="display-4">Our Features</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-icon">
              <i className="bi bi-bicycle"></i>
            </div>
            <h3>Wide Selection</h3>
            <p>Choose from a variety of bikes to suit your needs, from city bikes to mountain bikes.</p>
          </div>
          <div className="col-md-4">
            <div className="feature-icon">
              <i className="bi bi-calendar"></i>
            </div>
            <h3>Easy Booking</h3>
            <p>Book your bike in just a few clicks. Simple, fast, and convenient.</p>
          </div>
          <div className="col-md-4">
            <div className="feature-icon">
              <i className="bi bi-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Our support team is here to help you at any time of the day or night.</p>
          </div>
        </div>
      </div>

      <div className="container text-center my-5 section">
        <h2 className="display-4">What Our Users Say</h2>
        <div className="row">
          <div className="col-md-4">
            <blockquote>
              <p>"Excellent service! The booking process was smooth and the bike was in great condition."</p>
              <footer>- Jane Doe</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote>
              <p>"I loved the variety of bikes available. Definitely coming back for my next ride!"</p>
              <footer>- John Smith</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote>
              <p>"Great experience overall. The support team was very helpful when I had questions."</p>
              <footer>- Emily Johnson</footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="container text-center my-5 section">
        <h2 className="display-4">Get in Touch</h2>
        <p>If you have any questions or need further assistance, feel free to Contact Us.</p>
      </div>

      <div className="container text-center my-5 section">
        <h2 className="display-4">How It Works</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-icon">
              <i className="bi bi-search"></i>
            </div>
            <h3>1. Choose Your Bike</h3>
            <p>Browse our selection and pick the bike that suits your needs.</p>
          </div>
          <div className="col-md-4">
            <div className="feature-icon">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h3>2. Make a Reservation</h3>
            <p>Fill out the reservation form with your details and preferred rental period.</p>
          </div>
          <div className="col-md-4">
            <div className="feature-icon">
              <i className="bi bi-check-circle"></i>
            </div>
            <h3>3. Pick Up & Enjoy</h3>
            <p>Pick up your bike from our location and enjoy your ride!</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-page {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          width: 100%;
          color: white;
        }

        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          color: #fff;
          text-align: center;
          padding: 5rem 1rem;
          margin: 0 auto;
          max-width: 90%;
          width: 600px;
        }

        .btn-custom {
          background-color: #007bff;
          color: #fff;
          border-radius: 30px;
          padding: 10px 30px;
          margin-top: 20px;
          text-decoration: none;
        }

        .btn-custom:hover {
          background-color: #0056b3;
        }

        .link-custom {
          color: #007bff;
          text-decoration: underline;
        }

        .link-custom:hover {
          color: #0056b3;
        }

        .section {
          padding: 5rem 1rem;
        }

        .section h2 {
          margin-bottom: 3rem;
          color: #fff;
        }

        .section .row {
          margin-bottom: 2rem;
        }

        .section blockquote {
          font-size: 1.2rem;
          color: #fff;
          border-left: 5px solid #007bff;
          padding-left: 1rem;
          margin: 1rem 0;
        }

        .section blockquote footer {
          font-size: 0.9rem;
          color: #ddd;
        }

        .feature-icon {
          font-size: 3rem;
          color: #007bff;
        }

        .feature-icon, .btn-custom {
          transition: all 0.3s ease;
        }

        .feature-icon:hover {
          color: #0056b3;
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css"
      />
    </div>
  );
};

export default HomePage;
