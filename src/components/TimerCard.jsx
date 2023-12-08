import React, { useState, useEffect } from 'react';
import './TimerCard.scss';

function TimerCard({ mode, onTimerExpired }) {
  const initialRemainingTime = parseInt(localStorage.getItem('remainingTime')) || 10;
  // localStorage.removeItem('remainingTime') 
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        onTimerExpired();
      } else {
        setRemainingTime(remainingTime - 1);
        localStorage.setItem('remainingTime', (remainingTime - 1).toString());
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime, onTimerExpired]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  
  return (
    <div className={`card2 ${mode ? 'dark-mode-card' : 'light-mode-card'} ${timerExpired ? 'timer-expired' : ''}`}>
      <div className="timer">
        {hours > 0 && (
          <div className="time-unit">
            <div className='inside-time-unit'>
              <h6 className="minutes">{minutes.toString().padStart(2, '0')}</h6>
            </div>
            <br />
            <h6 className="label">hour</h6>
          </div>
        )}
        {hours > 0 && <div><h5>:</h5></div>}
        <div className="time-unit">
          <div className='inside-time-unit'>
            <h6 className="minutes">{minutes.toString().padStart(2, '0')}</h6>
          </div>
          <br />
          <h6 className="label">minutes</h6>
        </div>
        <div><h5>:</h5></div>
        <div className="time-unit">
          <h6 className="seconds">{seconds.toString().padStart(2, '0')}</h6>
          <br />
          <h6 className="label">seconds</h6>
        </div>
      </div>
    </div>
  );
}

export default TimerCard;
