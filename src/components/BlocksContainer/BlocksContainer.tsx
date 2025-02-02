import "./BlocksContainer.css";
import Block, { TaskType } from "../Block/Block";
import {
  TaskStorageType,
  updateLocalStorage,
} from "../LocalStorageController/LocalStorageController";

import { useState } from "react";

type ContainerProps = {
  tasks: TaskStorageType;
  onBacklogChange: (a: TaskType[]) => void;
  onFinishedChange: (a: TaskType[]) => void;
  showDescription: void;
};

function BlocksContainer({
  tasks,
  onBacklogChange,
  onFinishedChange,
  showDescription,
}: ContainerProps): JSX.Element {
  const [counter, setCounter] = useState(tasks.taskIdCounter);
  const [data, setData] = useState(tasks.backlogTasks);

  /* Добавление новой задачи (заголовка) */

  function addNewTask(newTask: TaskType) {
    tasks.backlogTasks.push(newTask);

    tasks.taskIdCounter = newTask.taskId;

    setCounter(tasks.taskIdCounter);

    updateLocalStorage(tasks);

    onBacklogChange(tasks.backlogTasks);
  }

  /*  Перенос задачи из одного блока в другой */

  function addTaskFromParent(id: number, blockName: string): void {
    switch (blockName) {
      case "Ready":
        tasks.backlogTasks = tasks.backlogTasks.filter(
          (item) => item.taskId !== id
        );
        setData(tasks.backlogTasks);
        onBacklogChange(tasks.backlogTasks);

        break;

      case "In Progress":
        tasks.readyTasks = tasks.readyTasks.filter(
          (item) => item.taskId !== id
        );
        setData(tasks.readyTasks);

        break;

      case "Finished":
        tasks.inProgressTasks = tasks.inProgressTasks.filter(
          (item) => item.taskId !== id
        );
        setData(tasks.inProgressTasks);
        onFinishedChange(tasks.finishedTasks);

        break;
    }

    updateLocalStorage(tasks);
  }

  /*   ----- */

  return (
    <div className="blocks__container">
      <Block
        blockName="Backlog"
        tasks={tasks.backlogTasks}
        idCounter={tasks.taskIdCounter}
        onAddNewTask={addNewTask}
        onShowDescription={showDescription}
      ></Block>
      <Block
        blockName="Ready"
        tasks={tasks.readyTasks}
        parentTasks={tasks.backlogTasks}
        onAddTask={addTaskFromParent}
        onShowDescription={showDescription}
      ></Block>
      <Block
        blockName="In Progress"
        tasks={tasks.inProgressTasks}
        parentTasks={tasks.readyTasks}
        onAddTask={addTaskFromParent}
        onShowDescription={showDescription}
      ></Block>
      <Block
        blockName="Finished"
        tasks={tasks.finishedTasks}
        parentTasks={tasks.inProgressTasks}
        onAddTask={addTaskFromParent}
        onShowDescription={showDescription}
      ></Block>
    </div>
  );
}

export default BlocksContainer;
