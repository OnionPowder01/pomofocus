import React , { useState } from "react";
import Settings from "./components/Settings";
import Timer from "./components/Timer";

function App() {

  const [showSettings, setShowSettings] = useState(false);
  console.log(showSettings)
  const settingsToggle = () => {
    setShowSettings(prevState => !prevState )
   
  }

  return (
    <>
    <main>
      {showSettings ? <Settings handleClick={settingsToggle} /> : <Timer handleClick={settingsToggle}/>}
    </main>
    </>
  );
}

export default App;
