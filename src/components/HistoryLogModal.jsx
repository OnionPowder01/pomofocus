import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HistoryLogButton from "./Button/HistoryLogButton";

function HistoryLogModal({ historyLog, cycle }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1); // initialize page to 1
  const PAGE_SIZE = 10; // number of items per page

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const pageCount = Math.ceil(historyLog.length / PAGE_SIZE); // calculate number of pages

  const startIdx = (page - 1) * PAGE_SIZE; // calculate start index of items for current page
  const endIdx = startIdx + PAGE_SIZE; // calculate end index of items for current page

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#30374b",
    borderRadius: "1%",
    boxShadow: 24,
    fontFamily: "Gloock, serif",
    p: 4,
  };

  return (
    <div>
      <HistoryLogButton
        className="history-log-container-svg"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal-box' sx={style}>
          <Typography id="modal-box" variant="h6" component="h2">
            Current Timer Log
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {historyLog.slice(startIdx, endIdx).map((session) => (
              <div key={session.start}>
                {session.start && (
                  <p className="start-time">
                    Start time:{" "}
                    {`${
                      session.currentMode.charAt(0).toUpperCase() +
                      session.currentMode.slice(1)
                    } Mode`}{" "}
                    {new Date(session.start).toLocaleString()}
                  </p>
                )}
                {session.pause && (
                  <p className="pause-time">
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

            {pageCount > 1 && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {[...Array(pageCount)].map((_, i) => {
                  if (
                    i === 0 ||
                    i === pageCount - 1 ||
                    (i >= page - 2 && i <= page)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        disabled={i + 1 === page}
                      >
                        {i + 1}
                      </button>
                    );
                  } else if (i === 1 || i === pageCount - 2) {
                    return <span key={i}>...</span>;
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default HistoryLogModal;
