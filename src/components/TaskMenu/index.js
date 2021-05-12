import React from "react";
import "./index.css"
import FilterBar from "../FilterBar";
import ConfigurationBar from "../ConfigurationBar";
import TaskInputForm from "../Input";
import InfoHeader from "../InfoHeader";
import TaskList from "../TaskList";

const editTaskInputComponent = "editTask"

const userTasks = [
  {taskId: 0, description: "Kill all heretics", modificationDate: new Date()},
  {taskId: 1, description: "Restore emperor's body", modificationDate: new Date()},
  {taskId: 2, description: "Cadia stands", modificationDate: new Date()}
];

class TaskMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: userTasks,
      filteringValue: "",
      showEditInputComponent: false,
      currentEditableTask: -1
    }
  }

  toggleComponent = (component) => {
    switch (component) {
      case editTaskInputComponent:
        this.setState((state) => ({showEditInputComponent: !state.showEditInputComponent}));
        break;
      default:
        return;
    }
  }

  handleTaskDelete = (taskId) => {
    this.setState((previousState) => ({
      tasks: previousState.tasks.filter(task => task.taskId !== taskId)
    }));
  }

  handleTaskAdd = (taskInfo) => {
    this.setState((previousState) => {
      const {tasks} = previousState;

      return {
        tasks: [...tasks, {...taskInfo, taskId: tasks.length, modificationDate: new Date()}],
      };
    });
  }

  handleTaskEdit = (taskInfo) => {
    this.setState((previousState) => {
      const {tasks: previousTasks} = previousState;
      const {taskId} = taskInfo;

      const tasks = [
        ...previousTasks.slice(0, taskId),
        {...taskInfo, modificationDate: new Date()},
        ...previousTasks.slice(taskId + 1, previousTasks.length)
      ];

      return {tasks: tasks};
    });
    this.toggleComponent(editTaskInputComponent)
  }

  handleFiltering = (value) => {
    this.setState({filteringValue: value});
  }

  render() {
    const {filteringValue, tasks, currentEditableTask} = this.state;
    const filteredTasks = tasks.filter(task => task.description.indexOf(filteringValue) !== -1);

    return (
      <div className="Menu">
        <FilterBar filteringValue={filteringValue} onFilter={this.handleFiltering}/>
        <ConfigurationBar onAdd={this.handleTaskAdd}/>
        {this.state.showEditInputComponent &&
        <TaskInputForm onSubmit={this.handleTaskEdit}
                       value={tasks[currentEditableTask].description}
                       taskId={currentEditableTask}
        />}
        <InfoHeader taskAmount={filteredTasks.length}/>
        <TaskList
          tasks={filteredTasks}
          filteringValue={filteringValue}
          onEdit={(taskId) => {
            this.setState({currentEditableTask: taskId})
            this.toggleComponent(editTaskInputComponent)
          }}
          onDelete={this.handleTaskDelete}
        />
      </div>
    );
  }
}

export default TaskMenu;