import { useState, useRef, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [input, setInput] = useState(60); // default 60 seconds
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleInputChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    setInput(val);
    setTimeLeft(val);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleStart = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const handleReset = () => {
    setTimeLeft(input);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Format time as mm:ss
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-title">Countdown Timer</div>
      <div className="timer-input-row">
        <input
          type="number"
          min="0"
          value={input}
          onChange={handleInputChange}
          disabled={isRunning}
          className="timer-input"
        />
        <span className="timer-label">seconds</span>
      </div>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-buttons">
        <button
          className="button"
          onClick={handleStart}
          disabled={isRunning || timeLeft === 0}
        >
          Start
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
