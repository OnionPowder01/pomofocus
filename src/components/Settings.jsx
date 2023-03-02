import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "./SettingsContext";

function Settings({ handleClick }) {
    const settingsInfo = useContext(SettingsContext)
  return (
    <div className="settings-container">
      <label>work:  {settingsInfo.workMinutes}:00 minutes </label>
      <ReactSlider
        className="slider"
        thumbActiveClassName="thumb"
        trackClassName="track"
        value={settingsInfo.workMinutes}
        
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00 minutes</label>
      <ReactSlider
        className="slider green"
        thumbActiveClassName="thumb"
        trackClassName="track"
        value={settingsInfo.breakMinutes}
        min={1}
        max={120}
      />
    </div>
  );
}

export default Settings;
