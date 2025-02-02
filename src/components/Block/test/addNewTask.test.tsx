import { fireEvent, getByTestId, render} from "@testing-library/react"
import Block, { TaskType } from "../Block"

it( 'submit event should be called with filled task name ', function () {

   const tasks = [];
   const onShowDescription = jest.fn()
   const onAddNewTask = jest.fn()


const {} = render(<Block blockName="Backlog" tasks={tasks} onShowDescription={onShowDescription} onAddNewTask={onAddNewTask}></Block>)


//извлечь инпут "block__input"

const newTaskInput = getByTestId("newtask-input")


//извлечь кнопку "block__submit-btn"

const newTaskBtn = getByTestId("newtask-button")

//заполнить инпут текстом

fireEvent.change(newTaskInput, {target: {value: "Very important task"}})

//вызвать нажатие кнопки "block__submit-btn"

fireEvent.click(newTaskBtn)

//проверить параметры вызова функции отправки

const expectedData: TaskType = {

   taskId: 1,
   taskText: "Very important task"

}

expect(onAddNewTask).toHaveBeenCalledWith(expectedData)


})