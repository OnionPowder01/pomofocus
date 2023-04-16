import React, { useState, useEffect, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "./TaskContext";


const Tasks = ({ columns, setColumns, tasks}) => {


  const initialColumns = {
    [uuidv4()]: {
      name: "Todo Tasks",
      items: tasks,
    },
  };

 useEffect(() => {
    setColumns(initialColumns)
 }, [tasks]);
 

  return (
    <div className="tasks-container">
      {Object.entries(columns).map(([id, column]) => {
        return (
          <Droppable key={id} droppableId={id}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "#262c3c"
                      : "#30374b",
                    marginTop: 20,
                    padding: 4,
                    width: 350,
                    height: 500,
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
                                backgroundColor: snapshot.isDragging
                                  ? "#30374b"
                                  : "none",
                                color: "white",
                                border: '1px solid white',
                                borderRadius: '10px',
                                borderStyle: 'dashed' ,
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
        );
      })}
    </div>
  );
};

export default Tasks;
