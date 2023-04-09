import { useState, useEffect, useRef } from "react";

function useTimer(settingsInfo) {
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState("work"); //work,break, null or pause
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [ringMode, setRingMode] = useState("");
    const [cycle, setCycle] = useState(0);
  
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
  
      if (secondsLeftRef.current === 0) {
        setIsDone(true);
      }
    }
  
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      setMode(nextMode);
      setRingMode(nextMode);
      modeRef.current = nextMode;
      setIsPaused(true);
      isPausedRef.current = true;
  
      const nextSeconds =
        nextMode === "work"
          ? settingsInfo.workMinutes * 60
          : settingsInfo.breakMinutes * 60;
  
      initiateTimer(nextSeconds);
    }
  
    useEffect(() => {
      if (mode === "work") {
        initiateTimer(settingsInfo.workMinutes * 60);
      }
      if (mode === "break") {
        initiateTimer(settingsInfo.breakMinutes * 60);
      }
      // eslint-disable-next-line
    }, [mode]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (isPausedRef.current) {
          return;
        }
        if (secondsLeftRef.current === 0) {
          return switchMode();
        }
  
        tick();
      }, 10);
  
      return () => clearInterval(interval);
      // eslint-disable-next-line
    }, [settingsInfo]);
  
    return {
      isPaused,
      setIsPaused,
      mode,
      setMode,
      secondsLeft,
      setSecondsLeft,
      isDone,
      setIsDone,
      cycle,
      setCycle,
      initiateTimer,
      tick,
      switchMode,
      secondsLeftRef,
      modeRef,
      isPausedRef,
      ringMode
    };
  }

  export default useTimer
  