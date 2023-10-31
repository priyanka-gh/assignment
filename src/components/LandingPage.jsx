import React, { useState, useEffect } from 'react';
import './LandingPage.scss';
import Rocket from "../images/rocket.svg";
import TimerCard from './TimerCard';
import ConfettiExplosion from 'react-confetti-explosion';

const LandingPage = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);

  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  }

  const [enteredEmails, setEnteredEmails] = useState([]);
  const [timerExpired, setTimerExpired] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleEmailChange = (e) => {
    const email = e.target.value.trim();
    setEnteredEmail(email);
    setIsEmailValid(true); // Reset email validation

    if (email === '') {
      setMessage('');
    } else if (isDuplicateEmail) {
      setIsDuplicateEmail(false);
      setMessage('');
    }
  }

  const handleNotifyClick = () => {
    const notifyButton = document.getElementById('notify-btn');

    if (enteredEmail === '') {
      return; // Email is required
    }

    if (!validateEmail(enteredEmail)) {
      setLoading(true);
      setIsEmailValid(false);

      setTimeout(() => {
        setEnteredEmail('')
        notifyButton.setAttribute('disabled', 'disabled');
        setInvalid('Invalid Email');
        setLoading(false);
      }, 2000);
    } else {
      if (enteredEmails.includes(enteredEmail)) {
        setLoading(true);

        setTimeout(() => {
          setMessage('Your email is already in our notify list. Try with another email');
          setIsDuplicateEmail(true);
          setEnteredEmail('');
          setInvalid('')
          setLoading(false);

        }, 2000)
      } else {
        setEnteredEmails([...enteredEmails, enteredEmail]);
        setLoading(true);
        setTimeout(() => {
          setIsEmailValid(false);
          setMessage(`You're all set! You'll be the first to know when we're live. `);
          setInvalid('')
          setLoading(false);
        }, 2000);
      }
    }
  }

  const handleTimerExpired = () => {
    setTimerExpired(true);
    setTimeout(() => {
      window.location.href = "/module"
    },4000)
    
  };
  
  const getStarted = () => {
    window.location.href = "/module"
  }

  return (
    <div className={`landing__container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='blob1'></div>
      <div className='blob2'></div>
      {!timerExpired && <div>
      <div className='h4__div'>
        <h4>THE <span>PRODUCT</span> PLATFORM</h4>
        <button className='btn' onClick={toggleMode}>Toggle Mode</button>
      </div>
      <div className='container__content'>
        <div>
          <div className='heading__container'>
            <img className='rocket' src={Rocket} alt="Rocket" />
            <h1>Launching New Module Soon!</h1>
          </div>
          <p>Exciting things are in the works! We're currently <span>Crafting a new feature for you.</span> <br /> Keep an eye out for updates – We're working to make it available soon!</p>
        </div>
        <div className="h3-container">
          <h3 className='glow-text'>GET READY FOR THE REVEAL!</h3>
          <h3 className='glow-text2'>GET READY FOR THE REVEAL!</h3>
          <div className="four-pointed-star"></div>
        </div>
        <TimerCard mode={isDarkMode} onTimerExpired={handleTimerExpired}/>
        <p className='share_msg'>Be the first to know! Share your email and We'll notify you when it's live</p>
        {message && <div className="message">{message}</div>}
        <div className='footer'>
          <input
            type="email"
            className="bordered-input"
            placeholder="Please enter your email id"
            value={enteredEmail}
            onChange={handleEmailChange}
          />
          <button
            id='notify-btn'
            onClick={handleNotifyClick}
            className="notify_btn"
            disabled={enteredEmail === '' || loading}
          >
            {loading ? (
                <div className="spinner"></div> // Display a loading spinner
            ) : (
                isEmailValid ? 'Notify Me' : '✓'
            )}
          </button>
        </div>
        {invalid && <div className='invalid__msg'>{invalid}</div>}
      </div>
      </div>
      }
      {
      timerExpired && 
      <div className="card__outside">
        <div className='card'>
        <div  className='confetti'>
        <ConfettiExplosion
          force={7}
          duration={2000}
          particleCount={250}
          width={1600} />
        </div>
          <h1 className='live__h1'>We are Live Now!</h1>
          <p className='live__p'>Our new feature is now <span>Live and ready</span> for you to explore. Go ahead and give it a try</p>
          <button onClick={getStarted} className='start__btn'>Get Started</button>
        </div>
        </div>
      }
    </div>
  )
}

export default LandingPage;


