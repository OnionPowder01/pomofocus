import React from "react";

const AddTaskButton = (props) => {
  return (
    <div className="tasks-button-container">
    <button {...props}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>Add Task</p>
    </button>
    </div>
  );
};

export default AddTaskButton;
