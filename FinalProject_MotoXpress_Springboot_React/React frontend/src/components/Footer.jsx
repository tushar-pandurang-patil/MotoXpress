import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ isHomePage }) => {
    return (
        <footer 
            className="footer" 
            style={{
                backgroundColor: 'transparent', 
                color: isHomePage ? '#ffffff' : '#000000', 
                padding: '20px 0',
                textAlign: 'left', 
                boxShadow: 'none', 
            }}
        >
            <Container>
                <Row>
                    <Col>
                        <p style={{ marginBottom: '5px' }}>
                            &copy; 2024 MOTOXPRESS. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p style={{ marginBottom: '0' }}>
                            Follow us on social media.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
