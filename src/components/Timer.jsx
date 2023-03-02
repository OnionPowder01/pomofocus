import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./Button/PauseButton";
import PlayButton from "./Button/PlayButton";
import SettingsButton from "./Button/SettingsButton";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer(props) {
  return (
    <>
      <div>
        <CircularProgressbar
          value={60}
          text={`60%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: red,
            tailColor: "rgba(255,255,255,.2)",
          })} 

        />
      </div>
      <div className="buttons-container">
        <PlayButton />
        <PauseButton />
      </div>
      <div className="settings-button-container">
          <SettingsButton onClick={props.handleClick}/>
      </div>
    </>
  );
}

export default Timer;
