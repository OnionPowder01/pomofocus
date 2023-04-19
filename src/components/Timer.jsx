import React, { useContext, useState } from "react";
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
import Tasks from "./Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import AddTaskButton from "./Button/AddTaskButton";
import AddTaskModal from "./AddTaskModal";
import onDragEnd from "../hooks/onDragEnd";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const { historyLog } = useContext(HistoryLogContext);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

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

  // const onDragEnd = (result, columns, setColumns) => {
  //   if(!result.destination) return;
  //   const { source, destination } = result;
  //   if (source.droppableId !== destination.droppableId) {

  //   } else {
  //     const column = columns[source.droppableId];
  //     const copiedItems = [...column.items];
  //     const [removed] = copiedItems.splice(source.index, 1);
  //     copiedItems.splice(destination.index, 0, removed);
  //     setColumns({
  //       ...columns,
  //       [source.droppableId]: {
  //         ...column,
  //         items: copiedItems
  //       } 
  //     })
  //   }
    

  // }

  // const tasksToCompleteText = tasks.length > 0 ? 'Tasks to complete' : ''

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
      <div className="add-task-container">
        <AddTaskButton onClick={() => setOpen(true)} />
        {/* <div className="tasks-to-complete">
          <p>{tasksToCompleteText}</p>
        </div> */}
      </div>

      <div>
        <AddTaskModal
          open={open}
          setOpen={setOpen}
          taskName={taskName}
          setTaskName={setTaskName}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>

      <div>
        <DragDropContext
          shouldRespectForcePress={true}
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <Tasks
            columns={columns}
            setColumns={setColumns}
            taskName={taskName}
            setTaskName={setTaskName}
            tasks={tasks}
          />
        </DragDropContext>
      </div>
    </>
  );
}

export default Timer;
