import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <Navbar 
      bg={darkMode ? 'dark' : 'light'} 
      variant={darkMode ? 'dark' : 'light'}
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          <span className="fs-3">🎊 Festival Countdown</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#upcoming">Upcoming Festivals</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <button 
              className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} ms-3`}
              onClick={toggleDarkMode}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
