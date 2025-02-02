import { TaskType } from "../Block/Block";

export type TaskStorageType = {
  taskIdCounter: number;
  backlogTasks: TaskType[];
  readyTasks: TaskType[];
  inProgressTasks: TaskType[];
  finishedTasks: TaskType[];
};

export const emptyDefaultBase: TaskStorageType = {
  taskIdCounter: 0,
  backlogTasks: [],
  readyTasks: [],
  inProgressTasks: [],
  finishedTasks: [],
};



 export function setEmptyTasksDatabase() {
  let emptyTasksDatabase: TaskStorageType = emptyDefaultBase;

  localStorage.setItem("TasksDatabase", JSON.stringify(emptyTasksDatabase));
}

export function updateLocalStorage(updatedTasks: TaskStorageType): void {
  localStorage.setItem("TasksDatabase", JSON.stringify(updatedTasks));

  console.log('storage updated')
  console.log(updatedTasks)
}


export function clearLocalStorage(): void {
  localStorage.clear();
} 



