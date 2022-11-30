import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { authenticate } from "./authenticate";
import * as Database from "../../../Database";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { HiXMark } from "react-icons/hi2";

const Column = dynamic(() => import("../../../components/intranet/Column"), {
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
      useEffect(() => setState(newState), []);
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
    useEffect(() => setState(newState), []);
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
  const popHide = "pop-hide" || "";
  return (
    <LayoutIntranet>
      <main className="bg-skin-fill ">
        <div className="layout py-20 md:py-12  flex flex-col items-center cursor-pointer">
          <h2>Lunchgrupper</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col min-h-full flex-wrap  w-screen gap-2 text-skin-muted pb-8">
              <div className="flex justify-center m-2">
                <button
                  className="btn btn-misc"
                  onClick={function () {
                    document.getElementById("popup").classList.remove(popHide);
                    document
                      .getElementById("creategroup")
                      .classList.remove(popHide);
                  }}
                >
                  Ny lunchgrupp
                </button>
              </div>
              <div className="flex flex-col items-center"></div>
              <div className="grid grid-cols-3 md:flex md:flex-row  gap-2 px-2 justify-center ">
                {state.columnOrder.map((columnId) => {
                  const column = state.columns.columns[columnId];
                  const tasks = column.users;
                  return (
                    <Column
                      className="shrink"
                      key={column.id}
                      column={column}
                      tasks={tasks}
                    />
                  );
                })}
              </div>
            </div>
          </DragDropContext>
          <div
            id="popup"
            className={`popup ${popHide}`}
            onClick={function () {
              document.getElementById("popup").classList.add(popHide);
              document.getElementById("creategroup").classList.add(popHide);
              document
                .getElementById("modifyLunchgroup")
                .classList.add(popHide);
            }}
          ></div>
          <div id="creategroup" className={` window-pop ${popHide}`}>
            <div className="relative bg-skin-fill rounded p-5 m-2 flex flex-col justify-center items-center">
              <div className=" flex flex-row justify-between">
                <h4 className="uppercase text-lg md:h1"> Ny lunchgrupp</h4>
                <button
                  className="absolute top-0 right-0 p-3 hover:text-skin-muted"
                  type="button"
                  onClick={function () {
                    document.getElementById("popup").classList.add(popHide);
                    document
                      .getElementById("creategroup")
                      .classList.add(popHide);
                  }}
                >
                  <HiXMark />
                </button>
              </div>

              <form
                className="flex "
                action="../../api/admin/createGroup"
                method="POST"
              >
                <div className="flex flex-col md:flex-row gap-4 py-4">
                  <input
                    className="p-2 border rounded "
                    type="text"
                    name="name"
                    placeholder="Gruppnamn"
                  />
                  <button className="shadow btn btn-create" type="submit">
                    Lägg till lunchgrupp
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div id="modifyLunchgroup" className={`window-pop ${popHide}`}>
            <div className="relative bg-skin-fill rounded p-5 m-2 flex flex-col justify-center items-center">
              <div className=" flex flex-row justify-between">
                <h4 className="uppercase text-lg md:h1"> Ändra Lunchgrupp</h4>
                <button
                  className="flex space-x-2 items-center"
                  type="button"
                  onClick={function () {
                    document.getElementById("popup").classList.add(popHide);
                    document
                      .getElementById("modifyLunchgroup")
                      .classList.add(popHide);
                  }}
                >
                  <HiXMark />
                </button>
              </div>

              <form
                className="flex "
                action="../../api/modifyLunchgroup"
                method="POST"
              >
                <div className="flex flex-col md:flex-row gap-4 py-4">
                  <input
                    className="title p-2"
                    type="text"
                    name="title"
                    placeholder="Titel"
                  />
                  <input className={`id ${popHide}`} type="text" name="id" />
                  <button className="shadow btn btn-create" type="submit">
                    Ändra händelse
                  </button>
                  <form action="../../api/admin/deleteLunchgroup" method="POST">
                    <input
                      className="id p-2 border rounded mb-2"
                      type="hidden"
                      name="id"
                    />
                    <button className="btn btn-delete" type="submit">
                      Radera händelse
                    </button>
                  </form>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </LayoutIntranet>
  );
}
