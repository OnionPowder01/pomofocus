import React, { useState } from "react";
import Settings from "./components/Settings";
import SettingsContext from "./components/SettingsContext";
import Timer from "./components/Timer";
import HistoryLogProvider from "./components/HistoryLogContext.jsx";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const settingsToggle = () => {
    setShowSettings((prevState) => !prevState);
  };

  return (
    <>
      <main>
        <HistoryLogProvider>
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}
        >
          {showSettings ? (
            <Settings handleClick={settingsToggle} />
          ) : (
            <Timer handleClick={settingsToggle} />
          )}
        </SettingsContext.Provider>
        </HistoryLogProvider>
      </main>
    </>
  );
}

export default App;
