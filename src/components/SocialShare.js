import React from 'react';
import { Button } from 'react-bootstrap';

const SocialShare = ({ festival, compact = false }) => {
  const shareUrl = window.location.href;
  const shareText = festival 
    ? `Check out ${festival.name} on ${new Date(festival.date).toLocaleDateString()}! 🎉`
    : 'Check out these amazing upcoming Indian festivals! 🎊';

  const handleShare = (platform) => {
    let url = '';
    
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: festival ? festival.name : 'Upcoming Indian Festivals',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  if (compact) {
    return (
      <div className="d-flex gap-2 align-items-center">
        <small className="text-muted me-2">Share:</small>
        <button 
          className="btn btn-sm btn-outline-primary"
          onClick={() => handleShare('facebook')}
          title="Share on Facebook"
        >
          📘
        </button>
        <button 
          className="btn btn-sm btn-outline-info"
          onClick={() => handleShare('twitter')}
          title="Share on Twitter"
        >
          🐦
        </button>
        <button 
          className="btn btn-sm btn-outline-success"
          onClick={() => handleShare('whatsapp')}
          title="Share on WhatsApp"
        >
          💬
        </button>
        {navigator.share && (
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={handleNativeShare}
            title="Share"
          >
            📤
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="social-share-buttons d-flex gap-3 flex-wrap justify-content-center">
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => handleShare('facebook')}
        className="px-4"
      >
        <span className="me-2">📘</span>
        Share on Facebook
      </Button>
      <Button 
        variant="info" 
        size="lg"
        onClick={() => handleShare('twitter')}
        className="px-4"
      >
        <span className="me-2">🐦</span>
        Share on Twitter
      </Button>
      <Button 
        variant="success" 
        size="lg"
        onClick={() => handleShare('whatsapp')}
        className="px-4"
      >
        <span className="me-2">💬</span>
        Share on WhatsApp
      </Button>
      <Button 
        variant="secondary" 
        size="lg"
        onClick={() => handleShare('linkedin')}
        className="px-4"
      >
        <span className="me-2">🔗</span>
        Share on LinkedIn
      </Button>
      {navigator.share && (
        <Button 
          variant="outline-secondary" 
          size="lg"
          onClick={handleNativeShare}
          className="px-4"
        >
          <span className="me-2">📤</span>
          More Options
        </Button>
      )}
    </div>
  );
};

export default SocialShare;
