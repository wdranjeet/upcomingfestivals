import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Header from './components/Header';
import FestivalCard from './components/FestivalCard';
import './App.css';

function App() {
  const [festivals, setFestivals] = useState([]);
  const [filteredFestivals, setFilteredFestivals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Fetch festivals from JSON file
    fetch('/festivals.json')
      .then(response => response.json())
      .then(data => {
        setFestivals(data);
        filterFestivals(data, 'all', '');
      })
      .catch(error => console.error('Error loading festivals:', error));

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    filterFestivals(festivals, filterType, searchQuery);
  }, [festivals, filterType, searchQuery]);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const filterFestivals = (data, type, search) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let filtered = data.filter(festival => {
      const festivalDate = new Date(festival.date);
      festivalDate.setHours(0, 0, 0, 0);
      
      // Only show upcoming festivals
      if (festivalDate < now) return false;
      
      // Filter by type
      if (type !== 'all' && festival.type !== type) return false;
      
      // Filter by search query
      if (search && !festival.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    // Sort by date (nearest first)
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setFilteredFestivals(filtered);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section with Background */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <div className="text-center text-white">
            <h1 className="display-3 fw-bold mb-4 animate-fade-in">
              🎉 Upcoming Indian Festivals 🎉
            </h1>
            <p className="lead mb-4 animate-fade-in">
              Countdown to India's vibrant celebrations and cultural events
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5" id="upcoming">
        {/* Search and Filter Section */}
        <Row className="mb-4">
          <Col md={8} className="mb-3 mb-md-0">
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search festivals..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select value={filterType} onChange={handleFilterChange}>
              <option value="all">All Festivals</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain</option>
              <option value="Buddhist">Buddhist</option>
              <option value="National">National</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Festival Count */}
        <div className="mb-4">
          <p className="text-muted">
            Showing <strong className="text-primary">{filteredFestivals.length}</strong> upcoming festivals
          </p>
        </div>

        {/* Festival Cards Grid */}
        {filteredFestivals.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredFestivals.map((festival, index) => (
              <Col key={index}>
                <FestivalCard festival={festival} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <h3 className="text-muted">😔 No festivals found</h3>
            <p className="text-muted">Try adjusting your search or filter</p>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className={`py-4 mt-5 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
        <Container className="text-center">
          <p className="mb-2">🎊 Celebrating Indian Culture and Traditions 🎊</p>
          <p className="small text-muted mb-0">Made with ❤️ for all festival lovers</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
