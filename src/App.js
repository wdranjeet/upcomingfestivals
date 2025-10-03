import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Header from './components/Header';
import FestivalCard from './components/FestivalCard';
import FestivalDetail from './components/FestivalDetail';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { fetchFestivals } from './services/festivalService';
import './App.css';

function AppContent() {
  const [festivals, setFestivals] = useState([]);
  const [filteredFestivals, setFilteredFestivals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [useAPI, setUseAPI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const loadFestivals = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchFestivals(useAPI);
      setFestivals(data);
      filterFestivalsData(data, 'all', '');
    } catch (error) {
      console.error('Error loading festivals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [useAPI]);

  useEffect(() => {
    // Fetch festivals
    loadFestivals();

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Check for saved API preference
    const savedUseAPI = localStorage.getItem('useAPI') === 'true';
    setUseAPI(savedUseAPI);
  }, [loadFestivals]);

  useEffect(() => {
    filterFestivalsData(festivals, filterType, searchQuery);
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

  const filterFestivalsData = (data, type, search) => {
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

  const toggleAPISource = async () => {
    const newUseAPI = !useAPI;
    setUseAPI(newUseAPI);
    localStorage.setItem('useAPI', newUseAPI);
    
    // Reload festivals with new source
    setIsLoading(true);
    try {
      const data = await fetchFestivals(newUseAPI);
      setFestivals(data);
      filterFestivalsData(data, filterType, searchQuery);
    } catch (error) {
      console.error('Error loading festivals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section with Background */}
              <div className="hero-section">
                <div className="hero-overlay"></div>
                <Container className="hero-content">
                  <div className="text-center text-white">
                    <h1 className="display-3 fw-bold mb-4 animate-fade-in">
                      🎉 {t('heroTitle')} 🎉
                    </h1>
                    <p className="lead mb-4 animate-fade-in">
                      {t('heroSubtitle')}
                    </p>
                  </div>
                </Container>
              </div>

              {/* Main Content */}
              <Container className="py-5" id="upcoming">
                {/* API Toggle Section */}
                <Row className="mb-3">
                  <Col className="d-flex justify-content-end">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="apiToggle"
                        checked={useAPI}
                        onChange={toggleAPISource}
                        disabled={isLoading}
                      />
                      <label className="form-check-label" htmlFor="apiToggle">
                        {isLoading ? '⏳ Loading...' : '🌐 Use Live API Data'}
                      </label>
                    </div>
                  </Col>
                </Row>

                {/* Search and Filter Section */}
                <Row className="mb-4">
                  <Col md={8} className="mb-3 mb-md-0">
                    <InputGroup>
                      <InputGroup.Text>🔍</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <Form.Select value={filterType} onChange={handleFilterChange}>
                      <option value="all">{t('allFestivals')}</option>
                      <option value="Hindu">{t('hindu')}</option>
                      <option value="Muslim">{t('muslim')}</option>
                      <option value="Christian">{t('christian')}</option>
                      <option value="Sikh">{t('sikh')}</option>
                      <option value="Jain">{t('jain')}</option>
                      <option value="Buddhist">{t('buddhist')}</option>
                      <option value="National">{t('national')}</option>
                    </Form.Select>
                  </Col>
                </Row>

                {/* Festival Count */}
                <div className="mb-4">
                  <p className="text-muted">
                    {t('showing')} <strong className="text-primary">{filteredFestivals.length}</strong> {t('upcomingFestivalsText')}
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
                    <h3 className="text-muted">😔 {t('noFestivalsFound')}</h3>
                    <p className="text-muted">{t('adjustSearchFilter')}</p>
                  </div>
                )}
              </Container>

              {/* Footer */}
              <footer className={`py-4 mt-5 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                <Container className="text-center">
                  <p className="mb-2">🎊 {t('celebratingCulture')} 🎊</p>
                  <p className="small text-muted mb-0">{t('madeWithLove')}</p>
                </Container>
              </footer>
            </>
          } />
          <Route path="/festival" element={<FestivalDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
