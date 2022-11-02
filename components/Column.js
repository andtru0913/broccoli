import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import popupStyles from "../pages/intranet/popup.module.css";
import {lunchgroup} from "../defaultIDs";

const Column = ({ column, tasks }) => {
    return (
        <Flex rounded="3px" bg="column-bg" w="400px" h="620px" flexDir="column">
            <Flex
                align="center"
                h="60px"
                bg="column-header-bg"
                rounded="3px 3px 0 0"
                px="1.5rem"
                mb="1.5rem"
            >
                <Text fontSize="17px" fontWeight={600} color="subtle-text" onClick={function() {
                    if (column.id !== lunchgroup) {
                        let modifyLunchgroup = document.getElementById("modifyLunchgroup")
                        modifyLunchgroup.getElementsByClassName('title')[0].value = column.title
                        modifyLunchgroup.getElementsByClassName('id')[0].value = column.id
                        modifyLunchgroup.classList.remove(popupStyles.hide)
                        document.getElementById("popup").classList.remove(popupStyles.hide)
                    }
                }}>
                    {column.title}
                </Text>
            </Flex>

            <Droppable droppableId={column.id}>
                {(droppableProvided) => (
                    <Flex
                        px="1.5rem"
                        flex={1}
                        flexDir="column"
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                {(draggableProvided, draggableSnapshot) => (
                                    <Flex
                                        mb="1rem"
                                        h="72px"
                                        bg="card-bg"
                                        rounded="3px"
                                        p="1.5rem"
                                        outline="2px solid"
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
                                    </Flex>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided  .placeholder}
                    </Flex>
                )}
            </Droppable>
        </Flex>
    );
};

export default Column;