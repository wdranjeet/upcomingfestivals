import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Countdown from './Countdown';

const FestivalCard = ({ festival }) => {
  const navigate = useNavigate();

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

  const handleLearnMore = () => {
    navigate('/festival', { state: { festival } });
  };

  return (
    <Card className="h-100 shadow-sm festival-card hover-effect">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <span className="fs-1 me-3">{festival.emoji}</span>
            <div>
              <Card.Title className="mb-1">{festival.name}</Card.Title>
              <small className="text-muted">{formatDate(festival.date)}</small>
            </div>
          </div>
          <Badge bg={getBadgeColor(festival.type)}>{festival.type}</Badge>
        </div>
        
        <Card.Text className="text-muted small">
          {festival.description}
        </Card.Text>
        
        <Countdown targetDate={festival.date} />
        
        <div className="d-grid gap-2 mt-3">
          <Button variant="primary" size="sm" onClick={handleLearnMore}>
            Learn More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FestivalCard;
