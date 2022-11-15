import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import popupStyles from "/styles/popup.module.css";
import { lunchgroup } from "../defaultIDs";

const Column = ({ column, tasks }) => {
  return (
    <div className="rounded-lg bg-skin-primary  flex flex-col">
      <div className="align-middle text-center bg-skin-secondary rounded-t-lg px-2 mb-2 md:px-6 md:mb-6">
        <h5
          className="font-medium text-xs md:text-lg text-skin-muted"
          onClick={function () {
            if (column.id !== lunchgroup) {
              let modifyLunchgroup =
                document.getElementById("modifyLunchgroup");
              modifyLunchgroup.getElementsByClassName("title")[0].value =
                column.title;
              modifyLunchgroup.getElementsByClassName("id")[0].value =
                column.id;
              modifyLunchgroup.classList.remove(popupStyles.hide);
              document
                .getElementById("popup")
                .classList.remove(popupStyles.hide);
            }
          }}
        >
          {column.title}
        </h5>
      </div>

      <Droppable droppableId={column.id}>
        {(droppableProvided) => (
          <div
            className="flex flex-1 flex-col px-2 md:px-6"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    className="flex mb-4 rounded-lg bg-skin-button-accent text-skin-inverted-muted justify-center rounded-sm p-2 md:p-6 outline-2 outline-white "
                    outlineColor={
                      draggableSnapshot.isDragging
                        ? "card-border"
                        : "transparent"
                    }
                    boxShadow={
                      draggableSnapshot.isDragging
                        ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                        : "unset"
                    }
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text>{task.firstname}</Text>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
