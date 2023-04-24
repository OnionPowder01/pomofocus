import React from "react";
import { Modal, Group, TextInput, Button } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({
  open,
  setOpen,
  taskName,
  setTaskName,
  setTasks,
  tasks,
}) => {
  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = { id: uuidv4(), content: taskName, finished: false };
    setTasks([...tasks, newTask]);
    setOpen(false);
    setTaskName('');
  };


  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        centered
      >
        <TextInput
          label="Task Name"
          placeholder="What are your working on ?"
          type="text"
          value={taskName}
          name="taskName"
          onChange={handleInputChange}
          withAsterisk
        />
        <div className="add-task-button-container">
          <Button color="dark" variant="subtle" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleAddTask}>
            Add Task
          </Button>
        </div>
      </Modal>

      <Group position="center"></Group>
    </>
  );
};

export default AddTaskModal;
