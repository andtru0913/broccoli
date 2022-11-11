import { Flex, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { authenticate } from "./authenticate";
import * as Database from "../../../Database";
import styles from "../../../styles/Home.module.css";
import popupStyles from "../../../components/popup.module.css";
import formStyles from "../form.module.css";
import LayoutIntranet from "../../../components/layout/layoutIntranet";

const Column = dynamic(() => import("../../../components/Column"), {
  ssr: false,
});

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newusers = Array.from(sourceCol.users);
  const [removed] = newusers.splice(startIndex, 1);
  newusers.splice(endIndex, 0, removed);

  return { ...sourceCol, users: newusers };
};

export async function getServerSideProps(context) {
  let authentication = await authenticate(context);
  if (authentication !== undefined) return authentication;

  let lunchGroups = await Database.getGroups(undefined);
  let users = await Database.getAllUsers();
  return {
    props: { lunchGroups: lunchGroups, users: users },
  };
}

export default function Home({ lunchGroups, users }) {
  let tasks = Object.assign(...users.map((a) => ({ [a.id.toString()]: a })));
  let columns = Object.assign(
    ...lunchGroups.map((a) => ({ [a.id.toString()]: a }))
  );
  const initialData = {
    tasks: {
      tasks,
    },
    columns: {
      columns,
    },
    // Facilitate reordering of the columns
    columnOrder: Object.keys(columns),
  };
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns.columns[source.droppableId];
    const destinationCol = state.columns.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startusers = Array.from(sourceCol.users);
    const [removed] = startusers.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      users: startusers,
    };

    const endusers = Array.from(destinationCol.users);
    endusers.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      users: endusers,
    };
    const newState = {
      ...state,
      columns: {
        columns: {
          ...state.columns.columns,
          [newStartCol.id]: newStartCol,
          [newEndCol.id]: newEndCol,
        },
      },
    };
    setState(newState);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../../api/changeLunchGroup", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        userid: result.draggableId,
        lunchid: destination.droppableId,
      })
    );
  };

  return (
    <LayoutIntranet>
      <main className="bg-skin-fill">
        <div className="layout py-20 md:py-12  flex flex-col items-center ">
          <h2>Lunchgrupper</h2>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col min-h-full w-full text-skin-muted pb-8">
              <Flex
                flexDir="column"
                bg="main-bg"
                minH="100vh"
                w="full"
                color="white-text"
                pb="2rem"
              >
                <div className="flex justify-center m-2">
                  <button
                    className="btn btn-misc"
                    onClick={function () {
                      document
                        .getElementById("popup")
                        .classList.remove(popupStyles.hide);
                      document
                        .getElementById("createuser")
                        .classList.remove(popupStyles.hide);
                    }}
                  >
                    Ny lunchgrupp
                  </button>
                </div>

                <div className="grid grid-flow-col px-5 justify-between">
                  {state.columnOrder.map((columnId) => {
                    const column = state.columns.columns[columnId];
                    const tasks = column.users;
                    return (
                      <Column key={column.id} column={column} tasks={tasks} />
                    );
                  })}
                </div>
              </Flex>
            </div>
          </DragDropContext>
          <div
            id="popup"
            className={`${popupStyles.popUp} ${popupStyles.hide}`}
            onClick={function () {
              document.getElementById("popup").classList.add(popupStyles.hide);
              document
                .getElementById("createuser")
                .classList.add(popupStyles.hide);
              document
                .getElementById("modifyLunchgroup")
                .classList.add(popupStyles.hide);
            }}
          ></div>
          <div
            id="createuser"
            className={`${popupStyles.window} ${popupStyles.hide}`}
          >
            <form
              className={formStyles.form}
              action="../../api/createGroup"
              method="POST"
            >
              <input type="text" name="name" placeholder="Gruppnamn" />
              <button type="submit">Lägg till lunchgrupp</button>
            </form>
          </div>
          <div
            id="modifyLunchgroup"
            className={`${popupStyles.window} ${popupStyles.hide}`}
          >
            <h1> Modify Event</h1>
            <form action="../../api/deleteLunchgroup" method="POST">
              <input
                className="title"
                type="text"
                name="title"
                placeholder="Titel"
              />
              <input
                className={`id ${popupStyles.hide}`}
                type="text"
                name="id"
              />
              <button type="submit"> Radera händelse</button>
            </form>
          </div>
        </div>
      </main>
    </LayoutIntranet>
  );
}
