import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Prathamesh from '../assets/images/Prath.jpg';
import Tushar from '../assets/images/Tushar.jpg';
import Soham from '../assets/images/Soham.png';
import Ruchita from '../assets/images/Ruchita.jpg';
import Chinmay from '../assets/images/Patkar.jpg';
import './ContactUs.css'; // Import custom CSS

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ypcnc16",
        "template_gf86d7v",
        form.current,
        "0ieyPTlvdz5H0raAg"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-us">
      <div className="container mt-5">
        <h2 className="text-center mb-4">Contact Us</h2>
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
            },
          ].map((person, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src={person.imgSrc} alt={person.name} />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <p className="card-text">Email: <a href={`mailto:${person.email}`}>{person.email}</a></p>
                  <p className="card-text">LinkedIn: <a href={person.linkedIn} target="_blank" rel="noopener noreferrer">{person.name}</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card mt-5 shadow-sm">
          <div className="card-header bg-primary text-white">Centre for Development of Advanced Computing, Mumbai</div>
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
            ></iframe>
          </div>
        </div>

        <div className="card mt-5 shadow-sm">
          <div className="card-body">
            <h3 className="text-center mb-4">Get in Touch</h3>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="user_name" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="user_email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" className="form-control" rows="4" required></textarea>
              </div>
              <div className="text-center mt-4">
                <input type="submit" value="Send" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
