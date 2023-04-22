import React, { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const Tasks = ({ columns, setColumns, tasks }) => {
  const initialColumns = {
    [uuidv4()]: {
      name: "Tasks to Complete",
      items: tasks.filter((task) => !task.finished),
      finished: false,
    },
    [uuidv4()]: {
      name: "Finished tasks",
      items: tasks.filter(task => task.finished),
      finished: true,
    },
  };

  useEffect(() => {
    setColumns(initialColumns);
  }, [tasks]);

  return (
    <div className="tasks-container">
      {Object.entries(columns).map(([id, column]) => {
        const customTaskColor = column.finished ? "#4aec8c" : "#f54e4e";
        return (
          <div key="id">
            <p
              style={{
                color: customTaskColor,
              }}
            >
              {tasks.length > 0 ? column.name : ""}
            </p>
            <Droppable key={id} droppableId={id} >
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "#262c3c"
                        : "#30374b",
                      padding: 4,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {column.items.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  color: customTaskColor,
                                  border: "1px",
                                  borderColor: customTaskColor,
                                  borderRadius: "10px",
                                  borderStyle: "dashed",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {item.content}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
