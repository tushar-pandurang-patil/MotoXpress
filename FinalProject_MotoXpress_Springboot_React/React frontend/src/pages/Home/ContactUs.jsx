import React from 'react';
import Prathamesh from '../../assets/Prath.jpg';
import Tushar from '../../assets/Tushar.jpg';
import Soham from '../../assets/Soham.png';
import Ruchita from '../../assets/Ruchita.jpg';
import Chinmay from '../../assets/Patkar.jpg';
import VideoBackground from '../../assets/video2.mp4'; // Add your video here

const ContactUs = () => {
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
        <source src={VideoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: 'relative',
          zIndex: '1',
          padding: '50px 0',
          minHeight: '100vh',
          color: '#fff', // Set text color to white for better visibility
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: 'white' }}>Contact Us</h1>
        </div>
        <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', padding: '30px' }}>
          <div className="row">
            {[
              {
                name: "Prathamesh Chaudhari",
                email: "prathamesh@example.com",
                linkedIn: "https://www.linkedin.com/in/prathamesh-chaudhari",
                imgSrc: Prathamesh,
              },
              {
                name: "Tushar Patil",
                email: "tushar@example.com",
                linkedIn: "https://www.linkedin.com/in/tusharpatil01/",
                imgSrc: Tushar,
              },
              {
                name: "Soham Ingale",
                email: "soham@example.com",
                linkedIn: "https://www.linkedin.com/in/soham-ingale",
                imgSrc: Soham,
              },
              {
                name: "Chinmay Patkar",
                email: "chinmay@example.com",
                linkedIn: "https://www.linkedin.com/in/chinmay-patkar",
                imgSrc: Chinmay,
              },
              {
                name: "Ruchita Yerpade",
                email: "ruchita@example.com",
                linkedIn: "https://www.linkedin.com/in/ruchita-yerpade",
                imgSrc: Ruchita,
              }
            ].map((person, index) => (
              <div key={index} className="col-md-4" style={{ marginBottom: '30px' }}>
                <div className="card mb-4" style={{ backgroundColor: '#333', color: '#fff' }}>
                  <img className="card-img-top" src={person.imgSrc} alt={person.name} />
                  <div className="card-body">
                    <h5 className="card-title">{person.name}</h5>
                    <p className="card-text">Email: <a href={`mailto:${person.email}`} style={{ color: '#1E90FF' }}>{person.email}</a></p>
                    <p className="card-text">LinkedIn: <a href={person.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#1E90FF' }}>{person.name}</a></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-4" style={{ backgroundColor: '#333', color: '#fff' }}>
            <div className="card-header">Centre for Development of Advanced Computing, Mumbai</div>
            <div className="card-body">
              <p>Address: Raintree Marg, Near Bharati Vidyapeeth, Opp. Kharghar Railway Station, Sector 7, CBD Belapur, Navi Mumbai - 400 614 - Maharashtra (India)</p>
              <p>Phone: +91-22-27565303<br />Fax: +91-22-2756-0004</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15087.439164812298!2d73.054246!3d19.025899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e0!3m2!1sen!2sin!4v1716228530904!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
