// src/Stopwatch.js
import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Effect to handle the timer
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10); // Increment every 10ms
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // Start the stopwatch
  const handleStart = () => {
    setIsActive(true);
  };

  // Stop the stopwatch
  const handleStop = () => {
    setIsActive(false);
  };

  // Reset the stopwatch
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  // Formatting the time
  const formatTime = (time) => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStart} disabled={isActive}>Start</button>
        <button onClick={handleStop} disabled={!isActive}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
