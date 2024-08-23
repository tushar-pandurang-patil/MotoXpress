import React from "react";
import { Carousel } from 'react-bootstrap';
import bike1 from '../assets/bike1.jpg'; 
import bike2 from '../assets/bike2.jpg';
import bike3 from '../assets/bike3.jpg';
import bike4 from '../assets/bike4.jpg';

const BikeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bike1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Bike 1</h3>
          <p>Description of Bike 1</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bike2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Bike 2</h3>
          <p>Description of Bike 2</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bike3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Bike 3</h3>
          <p>Description of Bike 3</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bike4}
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Bike 4</h3>
          <p>Description of Bike 4</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BikeCarousel;
