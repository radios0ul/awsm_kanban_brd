import { useState } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BlocksContainer from "./components/BlocksContainer/BlocksContainer";
import Description from "./components/Description/Description";
import Page404 from "./components/page404/page404";
import {
  TaskStorageType,
  setEmptyTasksDatabase,
  emptyDefaultBase,
  updateLocalStorage,
} from "./components/LocalStorageController/LocalStorageController";

import "./App.css";
import { TaskType } from "./components/Block/Block";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let allTasks: TaskStorageType = emptyDefaultBase;

  let database: string | null = localStorage.getItem("TasksDatabase");

  if (!database) {
    setEmptyTasksDatabase();
  } else {
    allTasks = JSON.parse(database);
  }

  const [currentTask, setCurrentTask] = useState(allTasks.backlogTasks[0]);

  const [backlogCounter, setBacklogCounter] = useState(
    allTasks.backlogTasks.length
  );
  const [finishedCounter, setFinishedCounter] = useState(
    allTasks.finishedTasks.length
  );

  /*  Функции для отрисовки количества задач в футере */

  function backlogChangeHandler(updatedBacklogTasks: TaskType[]) {
    setBacklogCounter(updatedBacklogTasks.length);
  }

  function finishedChangeHandler(updatedFinishedTasks: TaskType[]) {
    setFinishedCounter(updatedFinishedTasks.length);
  }

/*  Функции для отображения и обновления описаний задач */

  function goToDescription(item: TaskType): void {
    setCurrentTask(item);
  }

  function UpdateDescription(updatedTask: TaskType) {
    console.log(updatedTask);

    allTasks.backlogTasks.map((i) => {
      if (i.taskId == updatedTask.taskId) {
        i.taskDescription = updatedTask.taskDescription;
      }
    });

    allTasks.readyTasks.map((i) => {
      if (i.taskId == updatedTask.taskId) {
        i.taskDescription = updatedTask.taskDescription;
      }
    });

    allTasks.inProgressTasks.map((i) => {
      if (i.taskId == updatedTask.taskId) {
        i.taskDescription = updatedTask.taskDescription;
      }
    });

    allTasks.finishedTasks.map((i) => {
      if (i.taskId == updatedTask.taskId) {
        i.taskDescription = updatedTask.taskDescription;
      }
    });

    updateLocalStorage(allTasks);
  }

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={
              <BlocksContainer
                tasks={allTasks}
                onBacklogChange={backlogChangeHandler}
                onFinishedChange={finishedChangeHandler}
                showDescription={goToDescription}
              ></BlocksContainer>
            }
          />

          <Route
            path="/tasks/:currentTask"
            element={
              <Description
                task={currentTask}
                onUpdateDescription={UpdateDescription}
              ></Description>
            }
          />

          <Route path="*" element={<Page404></Page404>} />
        </Routes>
        <Footer
          backlogTasks={backlogCounter}
          finishedTasks={finishedCounter}
        ></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
