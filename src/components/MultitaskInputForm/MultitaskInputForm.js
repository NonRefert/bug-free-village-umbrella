import React from "react";
import "./MultitaskInput.css";
import "../TaskInputForm/TaskInputForm"
import TaskInfoInput from "../TaskInfoInput/TaskInfoInput";

class MultitaskInputForm extends React.Component {
  constructor(props) {
    super(props);
    const idGenerator = createIdGenerator();

    this.state = {
      idGenerator: idGenerator,
      tasks: [formNewTask(idGenerator.next().value)]
    }
  }

  handleInputAdding = () => {
    this.setState((previousState) => {
      const {tasks, idGenerator} = previousState;
      const nextId = idGenerator.next().value;

      return {tasks: [...tasks, formNewTask(nextId)]};
    });
  }

  handleInputRemoving = (taskId) => {
    this.setState((previousState) => ({
      tasks: previousState.tasks.filter((task) => task.taskId !== taskId)
    }));
  }

  handleInfoUpdate = (task, index) => {
    this.setState((previousState) => {
      const {tasks: previousTasks} = previousState;
      const tasks = [...previousTasks.slice(0, index), task, ...previousTasks.slice(index + 1, previousTasks.length)];

      return {tasks: tasks};
    });
  }

  handleSubmit = () => {
    const {tasks} = this.state;
    this.props.onSubmit(tasks.slice(0, tasks.length));
  }

  render() {
    const {tasks} = this.state;
    return (
      <div>
        <ul className="MultitaskForm">
          {tasks.map((task, index) => {
            const {description, category, taskId} = task;
            return (
              <li key={taskId}>
                <TaskInfoInput
                  description={description}
                  currentCategory={category}
                  inputIdentifier={formInputIdentifier(taskId)}
                  categories={this.props.categories}
                  onDescriptionUpdate={value => this.handleInfoUpdate({...task, description: value}, index)}
                  onCategoryUpdate={value => this.handleInfoUpdate({...task, category: value}, index)}
                />
                <button className="btn btn-dark" onClick={this.handleInputAdding} disabled={index !== tasks.length - 1}>
                  Add
                </button>
                <button className="btn btn-dark"
                        onClick={() => this.handleInputRemoving(taskId)}
                        disabled={tasks.length === 1}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        <button className="btn btn-info" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

function formInputIdentifier(taskId) {
  return `add_task_${taskId}`;
}

function formNewTask(taskId, description = "", category = "") {
  return {taskId: taskId, description: description, category: category};
}

function* createIdGenerator() {
  let counter = 0;
  while (true) {
    yield counter;
    counter++;
  }
}

export  default MultitaskInputForm;