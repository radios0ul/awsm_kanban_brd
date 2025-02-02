import "./Block.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export type TaskType = {
  taskId: number;
  taskText: string;
  taskDescription?: string;
};

type BlockProps = {
  blockName: string;
  tasks: TaskType[];
  parentTasks?: TaskType[];
  idCounter?: number;
  onAddTask?: (a: number, b: string) => void;
  onAddNewTask?: (a: TaskType) => void;
  onShowDescription: any;
};

function Block({
  blockName,
  tasks,
  parentTasks,
  idCounter,
  onAddTask,
  onAddNewTask,
  onShowDescription,
}: BlockProps): JSX.Element {
  const [showInput, toggleInput] = useState<boolean>(false);
  const [showDropdown, toggleDropdown] = useState<boolean>(false);
  const [showDropdownBtn, toggleDropdownBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  console.log(" block rebuild " + blockName);
  console.log(parentTasks);

  /*  Хэндлер кнопки Add task */

  const addTaskBtnHandler = () => {
    if (blockName === "Backlog") {
      toggleInput(!showInput);
    } else {
      toggleDropdown(!showDropdown);
    }
  };

  /*  Хэндлер выпадающего списка */

  function dropdownBtnHandler() {
    toggleDropdown(!showDropdown);
  }

  /*  Хэндлер инпута заголовка задачи */

  function changeInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  /*  Хэндлер кнопки добавления задачи */

  function submitBtnHandler() {
    let updatedCounter: number;
    if (inputValue !== "") {
      updatedCounter = idCounter! + 1;

      const newTask: TaskType = {
        taskId: updatedCounter,
        taskText: inputValue,
      };

      onAddNewTask(newTask);
      toggleInput(!showInput);
      setInputValue("");
    } else {
      toggleInput(!showInput);
    }
  }

  /*  Хэндлер кнопки выбора задачи для переноса из предыдущего блока */

  function addTaskFromParentHandler(item: TaskType, e: React.MouseEvent) {
    e.stopPropagation();
    tasks.push(item);
    toggleDropdown(!showDropdown);
    toggleDropdownBtn(!showDropdownBtn);
    const id = item.taskId;
    onAddTask(id, blockName);
  }

  /*  Хэндлер перехода на страницу описания задачи */

  function descriptoonBtnHandler(item: TaskType, e: React.MouseEvent) {
    e.stopPropagation();

    onShowDescription(item);
  }

  return (
    <div className="block">
      <div className="block__name">{blockName}</div>
      <div className="tasks__container">
        {tasks.map((item) => (
          <div className="task" key={item.taskId}>
            <button
              className="task__btn"
              onClick={(e) => descriptoonBtnHandler(item, e)}
            >
              <Link to={"/tasks/task_id=" + item.taskId}>
                <div>{item.taskText}</div>
              </Link>
            </button>
          </div>
        ))}
      </div>

      {showDropdown ? (
        <div className="block__dropdown">
          <button onClick={dropdownBtnHandler} className="dropdown__btn">
            <svg
              className="dropdown__up"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 0.5L11 13L19 0.5" stroke="black" />
            </svg>
          </button>
          <div className="dropdown__container">
            {parentTasks ? (
              parentTasks.map((item) => (
                <button
                  onClick={(e) => addTaskFromParentHandler(item, e)}
                  className="dropdown__task"
                  key={item.taskId}
                >
                  {item.taskText}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {showInput ? (
        <div className="block__form">
          <input
            autoFocus
            onChange={changeInputHandler}
            type="text"
            className="block__input"
            data-testid="newtask-input"
          />
          <button onClick={submitBtnHandler} 
          className="block__submit-btn"
          data-testid="newtask-button">
            
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}

      {!showInput && !showDropdown ? (
        <button
          onClick={addTaskBtnHandler}
          className="block__add-btn"
          disabled={
            blockName !== "Backlog" && parentTasks && parentTasks.length == 0
          }
        >
          <span>+</span>Add card
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Block;
