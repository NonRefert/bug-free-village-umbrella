import React from "react";
import "./TaskMenu.css"
import FilterBar from "../FilterBar/FilterBar";
import ConfigurationBar from "../ConfigurationBar/ConfigurationBar";
import TaskList from "../TaskList/TaskList";

class TaskMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteringValue: ""
    }
  }

  handleTaskDelete = (taskId) => {
    this.setState((previousState) => ({
      tasks: previousState.tasks.filter(task => task.taskId !== taskId)
    }));
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
  }

  handleFiltering = (value) => {
    this.setState({filteringValue: value});
  }

  render() {
    const {filteringValue} = this.state;

    return (
      <div className="Menu">
        <FilterBar filteringValue={filteringValue} onFilter={this.handleFiltering}/>
        <ConfigurationBar/>
        <TaskList filteringValue={filteringValue}/>
      </div>
    );
  }
}



export default TaskMenu;