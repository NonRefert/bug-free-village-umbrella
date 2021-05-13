import React from "react";
import "./MultitaskInput.css";
import "../TaskInputForm/TaskInputForm"
import TaskInfoInput from "../TaskInfoInput/TaskInfoInput";

class MultitaskInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [formNewTask(0)]
    }
  }

  handleInputAdding = () => {
    this.setState((previousState) => {
      const {tasks} = previousState;

      return {tasks: [...tasks, formNewTask(tasks.length)]};
    });
  }

  handleInputRemoving = (taskId) => {
    this.setState((previousState) => ({
      tasks: previousState.tasks.filter((task) => task.taskId !== taskId)
    }));
  }

  handleInfoUpdate = (task) => {
    this.setState((previousState) => {
      const {tasks: previousTasks} = previousState;
      const {taskId: index} = task;
      const tasks = [...previousTasks.slice(0, index), task, ...previousTasks.slice(index + 1, previousTasks.length)];

      return {tasks: tasks};
    })
  }

  render() {
    const {tasks} = this.state;
    return (
      <div>
        {tasks.map((task, index) => {
          const {description, category, taskId} = task;
          return (
            <ul>
              <li key={index}>
                <TaskInfoInput
                  description={description}
                  currentCategory={category}
                  inputIdentifier={formInputIdentifier(index)}
                  categories={this.props.categories}
                  onDescriptionUpdate={value => this.handleInfoUpdate({...task, description: value})}
                  onCategoryUpdate={value => this.handleInfoUpdate({...task, category: value})}
                />
                <button onClick={() => this.handleInputAdding()} disabled={index !== tasks.length - 1}>Add</button>
                <button onClick={() => this.handleInputRemoving(taskId)} disabled={tasks.length === 1}>Remove</button>
              </li>
            </ul>
          );
        })}
        <button onClick={() => this.props.onSubmit(tasks.slice(0, tasks.length))}>Submit</button>
      </div>
    )
  }
}

function formInputIdentifier(taskId) {
  return `add_task_${taskId}`
}

function formNewTask(taskId, description = "", category = "") {
  return {taskId: taskId, description: description, category: category}
}

export default MultitaskInputForm;