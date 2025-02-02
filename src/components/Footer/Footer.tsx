import "./Footer.css";
import { clearLocalStorage } from "../LocalStorageController/LocalStorageController";

type FooterProps = {
  backlogTasks: number;
  finishedTasks: number;
};

function Footer({ backlogTasks, finishedTasks }: FooterProps): JSX.Element {
  const personName: string = "<NAME>";
  const personYear: number | string = "<YEAR>";

  return (
    <footer className="footer">
      <div className="tasks__wrapper">
        <div className="active__tasks">
          <span>Active tasks: {backlogTasks}</span>
        </div>
        <div className="finished__tasks">
          <span>Finished tasks: {finishedTasks}</span>
        </div>
      </div>

      <button onClick={clearLocalStorage} className="clear__btn">
        clear local storage
      </button>

      <div className="person__wrapper">
        <span>
          Kanban board by {personName} , {personYear}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
