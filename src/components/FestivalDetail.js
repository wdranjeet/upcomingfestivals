import React, { useState, useEffect } from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import SocialShare from './SocialShare';
import { useLanguage } from '../contexts/LanguageContext';

const FestivalDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const festival = location.state?.festival;
  const { t, getFestivalDescription } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // If no festival data, redirect to home
    if (!festival) {
      navigate('/');
      return;
    }

    const calculateTimeLeft = () => {
      const difference = new Date(festival.date) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [festival, navigate]);

  // If no festival data, show nothing while redirecting
  if (!festival) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getBadgeColor = (type) => {
    const colors = {
      'Hindu': 'warning',
      'Muslim': 'success',
      'Christian': 'danger',
      'Sikh': 'primary',
      'National': 'secondary',
      'Jain': 'info',
      'Buddhist': 'dark'
    };
    return colors[type] || 'secondary';
  };

  const addToGoogleCalendar = () => {
    const event = {
      text: festival.name,
      dates: `${festival.date.replace(/-/g, '')}/${festival.date.replace(/-/g, '')}`,
      details: festival.description
    };
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="festival-detail-page">
      {/* Hero Section with Festival Info */}
      <div className="festival-detail-hero">
        <div className="hero-overlay"></div>
        <Container className="hero-content text-center">
          <div className="festival-emoji-large mb-4">
            {festival.emoji}
          </div>
          <h1 className="display-2 fw-bold text-white mb-3 animate-fade-in">
            {festival.name}
          </h1>
          <p className="lead text-white mb-2">
            {formatDate(festival.date)}
          </p>
          <Badge bg={getBadgeColor(festival.type)} className="fs-5 px-3 py-2">
            {festival.type}
          </Badge>
        </Container>
      </div>

      {/* Countdown Section */}
      <Container className="py-5">
        <div className="countdown-section text-center mb-5">
          <h2 className="display-4 fw-bold mb-4">Countdown</h2>
          <div className="large-countdown-wrapper">
            <div className="row g-3 justify-content-center">
              <div className="col-6 col-md-3">
                <LargeCountdownBox 
                  value={timeLeft.days} 
                  label={t('days')}
                  gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                />
              </div>
              <div className="col-6 col-md-3">
                <LargeCountdownBox 
                  value={timeLeft.hours} 
                  label={t('hours')}
                  gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                />
              </div>
              <div className="col-6 col-md-3">
                <LargeCountdownBox 
                  value={timeLeft.minutes} 
                  label={t('minutes')}
                  gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                />
              </div>
              <div className="col-6 col-md-3">
                <LargeCountdownBox 
                  value={timeLeft.seconds} 
                  label={t('seconds')}
                  gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="description-section mb-5">
          <h3 className="fw-bold mb-3">{t('about')} {festival.name}</h3>
          <p className="lead">{getFestivalDescription(festival.name, festival.description)}</p>
        </div>

        {/* Social Share Section */}
        <div className="mb-5">
          <h4 className="text-center fw-bold mb-4">{t('share')}</h4>
          <SocialShare festival={festival} />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons d-flex gap-3 justify-content-center flex-wrap">
          <Button 
            variant="success" 
            size="lg"
            onClick={addToGoogleCalendar}
            className="px-5 py-3"
          >
            <span className="me-2">📅</span>
            {t('addToCalendar')}
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/')}
            className="px-5 py-3"
          >
            <span className="me-2">←</span>
            {t('backToFestivals')}
          </Button>
        </div>
      </Container>
    </div>
  );
};

// Large Countdown Box Component
const LargeCountdownBox = ({ value, label, gradient }) => {
  return (
    <div 
      className="large-countdown-box text-white text-center p-4 rounded shadow"
      style={{ background: gradient }}
    >
      <div className="countdown-number display-1 fw-bold mb-2">
        {value}
      </div>
      <div className="countdown-label h5 text-uppercase">
        {label}
      </div>
    </div>
  );
};

export default FestivalDetail;
