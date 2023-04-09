import React, { useContext } from 'react'
import { HistoryLogContext } from '../components/HistoryLogContext';

const HandleHistoryLog = (mode) => {

    const { addToHistory } = useContext(HistoryLogContext);
  

    const handleStart = () => {
        const startTime = new Date().getTime();
        // Start the timer
        addToHistory({ start: startTime, currentMode: mode });
      };
    
      const handlePause = () => {
        const pauseTime = new Date().getTime();
        // Pause the timer
        const updatedSession = { pause: pauseTime, currentMode: mode };
        addToHistory(updatedSession);
      };
  return { handleStart, handlePause }
}

export default HandleHistoryLog