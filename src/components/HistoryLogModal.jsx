import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";

function HistoryLogModal({ historyLog, cycle }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#30374b",
    borderRadius: '1%' ,
    boxShadow: 24,
    fontFamily: 'Gloock, serif',
    p: 4,
  };

  console.log(historyLog);
  console.log(cycle);

  return (
    <div >
    <Button onClick={handleOpen}>Open modal</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-box" variant="h6" component="h2">
          Current Timer Log
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {historyLog.map((session) => (
        <div key={session.start}>
          {session.start && (
            <p>
              Start time:{" "}
              {`${
                session.currentMode.charAt(0).toUpperCase() +
                session.currentMode.slice(1)
              } Mode`}{" "}
              {new Date(session.start).toLocaleString()}
            </p>
          )}
          {session.pause && (
            <p>
              Pause time:{" "}
              {`${
                session.currentMode.charAt(0).toUpperCase() +
                session.currentMode.slice(1)
              } Mode`}{" "}
              {new Date(session.pause).toLocaleString()}
            </p>
          )}
        </div>
      ))}
      {cycle ? <p> Cycles completed {cycle} </p> : ""}
        </Typography>
      </Box>
    </Modal>
    </div>
  );
}

export default HistoryLogModal;
