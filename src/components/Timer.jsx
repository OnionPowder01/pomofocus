import React, { useState, useEffect, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./Button/PauseButton";
import PlayButton from "./Button/PlayButton";
import SettingsButton from "./Button/SettingsButton";
import SettingsContext from "./SettingsContext";

function Timer(props) {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); //work,break, null or pause
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function initiateTimer() {
    setSecondsLeft(settingsInfo.workMinutes * 60);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      nextMode === "work"
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initiateTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      } 
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);
    
    return clearInterval(interval)
    // eslint-disable-next-line
  }, [settingsInfo]);

  const handlePause = () => setIsPaused((prevState) => !prevState);

  return (
    <>
      <div>
        <CircularProgressbar
          value={secondsLeft}
          text={secondsLeft}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: "#f54e4e",
            tailColor: "rgba(255,255,255,.2)",
          })}
        />
      </div>
      <div className="buttons-container">
        {isPaused ? (
          <PlayButton onClick={handlePause} />
        ) : (
          <PauseButton onClick={handlePause} />
        )}
      </div>
      <div className="settings-button-container">
        <SettingsButton onClick={props.handleClick} />
      </div>
    </>
  );
}

export default Timer;
