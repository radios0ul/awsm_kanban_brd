import { TaskType } from "../Block/Block";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Description.css";

type DescriptionProps = {
  task: TaskType;
  onUpdateDescription(task: TaskType): void;
};

function Description({
  task,
  onUpdateDescription,
}: DescriptionProps): JSX.Element {
  let updatedDescription: string | undefined = task.taskDescription;

  const [taskUpdatedDescription, setTaskUpdatedDescription] = useState(
    task.taskDescription
  );

  const [showEdit, toggleEdit] = useState<boolean>(false);

  /*  Добавление описания к задаче */

  function addDescription() {
    setTaskUpdatedDescription(updatedDescription);

    task.taskDescription = updatedDescription;

    onUpdateDescription(task);
  }

  /*  Получение текста описания из инпута */

  function inputHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    updatedDescription = event.target.value;
  }

  /*  Хэндлер кнопки редактирования описания */

  function editHandler() {
    toggleEdit(!showEdit);
  }

  /*  Хэндлер кнопки сохранения описания */

  function saveChangesBtnHandler() {
    toggleEdit(!showEdit);

    addDescription();
  }

  return (
    <div className="description__container">
      <div className="description__block">
        <div className="description__header">
          <h2 className="task__name">{task.taskText}</h2>
          <Link to="/">
            <button className="close__btn">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1.35355"
                  y1="0.646447"
                  x2="24.3536"
                  y2="23.6464"
                  stroke="black"
                />
                <line
                  y1="-0.5"
                  x2="32.5269"
                  y2="-0.5"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)"
                  stroke="black"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div className="description__section">
          <p className="task__description">{taskUpdatedDescription}</p>

          {!task.taskDescription ? (
            <>
              <p>This task has no description</p>
              <textarea
                className="description__input"
                onChange={inputHandler}
              />
              <button className="desc__btn" onClick={addDescription}>
                Add description
              </button>
            </>
          ) : (
            <button className="desc__btn" onClick={editHandler}>
              Edit description
            </button>
          )}

          {showEdit ? (
            <>
              <textarea
                className="description__edit-input"
                defaultValue={task.taskDescription}
                onChange={inputHandler}
              />
              <button onClick={saveChangesBtnHandler} className="desc__btn">
                Save changes
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Description;
