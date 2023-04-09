import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./Button/PauseButton";
import PlayButton from "./Button/PlayButton";
import SettingsButton from "./Button/SettingsButton";
import WorkButton from "./Button/WorkButton";
import SettingsContext from "./SettingsContext";
import { ToastContainer } from "react-toastify";
import { HistoryLogContext } from "./HistoryLogContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import HistoryLogModal from "./HistoryLogModal";
import useTimer from "../hooks/useTimer";
import Ring from "./Ring";
import useToaster from "../hooks/useToaster";
import HandleHistoryLog from "./HandleHistoryLog";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const { historyLog } = useContext(HistoryLogContext);

  const {
    isPaused,
    setIsPaused,
    mode,
    setMode,
    secondsLeft,
    isDone,
    cycle,
    isPausedRef,
    ringMode,
    percentage,
  } = useTimer(settingsInfo);

  const { handleStart, handlePause } = HandleHistoryLog(mode);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  useToaster(isDone, mode);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>
        <Ring ringMode={ringMode} />
      </div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds} `}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? "#f54e4e" : "#4aec8c",
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div className="buttons-container">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
              handleStart();
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
              handlePause();
            }}
          />
        )}
      </div>
      <div className="settings-button-container">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
      <div className="down-buttons-container">
        <div className="breakMode-container">
          <PauseButton
            onClick={() => setMode("break")}
            className="breakMode-container-svg"
          />
          Break Mode
        </div>
        <div onClick={() => setMode("work")} className="workMode-container">
          <WorkButton className="workMode-container-svg" />
          Work Mode
        </div>
        <div className="history-log-container">
          <HistoryLogModal historyLog={historyLog} cycle={cycle} />
          Report
        </div>
      </div>
    </>
  );
}

export default Timer;
