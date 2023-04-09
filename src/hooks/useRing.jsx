import { useState, useEffect } from "react";
import { EasyRingReactComponent } from "easy-ring";
import testAudio from "../assets/bell-ring-01.wav";

function Ring({ ringMode }) {
  const [open, setOpen] = useState(false);
  const [ring, setRing] = useState(false);

  useEffect(() => {
    setOpen(true);
    setRing(true);

    const interval = setTimeout(() => {
      setRing(false);
    }, 2000);

    return () => clearTimeout(interval);
    // eslint-disable-next-line
  }, [ringMode]);

  return (
    <EasyRingReactComponent
      open={open}
      ring={ring}
      src={testAudio}
      setRing={setRing}
    ></EasyRingReactComponent>
  );
}

export default Ring;
