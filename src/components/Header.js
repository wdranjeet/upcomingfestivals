import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import MusicPlayer from './MusicPlayer';
import { useLanguage } from '../contexts/LanguageContext';

const Header = ({ darkMode, toggleDarkMode }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Navbar 
      bg={darkMode ? 'dark' : 'light'} 
      variant={darkMode ? 'dark' : 'light'}
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          <span className="fs-3">🎊 {t('appTitle')}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home">{t('home')}</Nav.Link>
            <Nav.Link href="#upcoming">{t('upcomingFestivals')}</Nav.Link>
            <Nav.Link href="#contact">{t('contact')}</Nav.Link>
            <button 
              className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} ms-3`}
              onClick={toggleLanguage}
              title={language === 'en' ? 'हिंदी में देखें' : 'View in English'}
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <MusicPlayer darkMode={darkMode} />
            <button 
              className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} ms-2`}
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
