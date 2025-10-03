import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
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
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      <div className="row g-2">
        <div className="col-3">
          <div className="countdown-box bg-gradient text-white text-center p-3 rounded shadow-sm">
            <div className="countdown-number display-6 fw-bold">{timeLeft.days}</div>
            <div className="countdown-label small">Days</div>
          </div>
        </div>
        <div className="col-3">
          <div className="countdown-box bg-gradient text-white text-center p-3 rounded shadow-sm">
            <div className="countdown-number display-6 fw-bold">{timeLeft.hours}</div>
            <div className="countdown-label small">Hours</div>
          </div>
        </div>
        <div className="col-3">
          <div className="countdown-box bg-gradient text-white text-center p-3 rounded shadow-sm">
            <div className="countdown-number display-6 fw-bold">{timeLeft.minutes}</div>
            <div className="countdown-label small">Minutes</div>
          </div>
        </div>
        <div className="col-3">
          <div className="countdown-box bg-gradient text-white text-center p-3 rounded shadow-sm">
            <div className="countdown-number display-6 fw-bold">{timeLeft.seconds}</div>
            <div className="countdown-label small">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
