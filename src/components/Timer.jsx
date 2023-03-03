import React, { useState, useEffect, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./Button/PauseButton";
import PlayButton from "./Button/PlayButton";
import SettingsButton from "./Button/SettingsButton";
import SettingsContext from "./SettingsContext";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); //work,break, null or pause
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function initiateTimer(seconds) {
    setSecondsLeft(seconds);
    secondsLeftRef.current = seconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

useEffect(() => {
  if(mode === 'work') {
    initiateTimer(settingsInfo.workMinutes * 60);
  }
  if(mode === 'break') {
    initiateTimer(settingsInfo.breakMinutes * 60);
  }
  
  // eslint-disable-next-line
}, [mode])




  useEffect(() => {
    

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [settingsInfo]);

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    setMode(nextMode);
    modeRef.current = nextMode;

    const nextSeconds =
      nextMode === "work"
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;

    initiateTimer(nextSeconds);
  }

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) seconds = "0" + seconds;


console.log(mode);

  return (
    <>
      <div>
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds} `}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: mode === 'work' ? "#f54e4e" : "#4aec8c",
            tailColor: "rgba(255,255,255,.2)",
          })}
        />
      </div>
      <div className="buttons-container">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className="settings-button-container">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
      <button onClick={() => setMode('break')}>Break Mode</button>
      <button onClick={() => setMode('work')}>Work Mode</button>
    </>
  );
}

export default Timer;
