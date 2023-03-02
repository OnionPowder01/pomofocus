import React , { useState } from "react";
import Settings from "./components/Settings";
import SettingsContext from "./components/SettingsContext";
import Timer from "./components/Timer";

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5)

  const settingsToggle = () => {
    setShowSettings(prevState => !prevState )
  
  }


  return (
    <>
    <main>
      <SettingsContext.Provider value={{
         workMinutes,
         breakMinutes,
         setWorkMinutes,
         setBreakMinutes,
      }}> 
      {showSettings ? <Settings  /> : <Timer handleClick={settingsToggle}/>}
      </SettingsContext.Provider> 
    </main>
    </>
  );
}

export default App;
