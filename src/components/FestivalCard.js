import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap';
import Countdown from './Countdown';

const FestivalCard = ({ festival }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
    <>
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
            <Button variant="primary" size="sm" onClick={handleShow}>
              Learn More
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="me-2">{festival.emoji}</span>
            {festival.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Date:</strong> {formatDate(festival.date)}</p>
          <p><strong>Type:</strong> <Badge bg={getBadgeColor(festival.type)}>{festival.type}</Badge></p>
          <p><strong>Description:</strong></p>
          <p>{festival.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addToGoogleCalendar}>
            Add to Google Calendar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FestivalCard;
