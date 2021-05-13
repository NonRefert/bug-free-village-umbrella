import React from "react";
import "./TaskMenu.css"
import FilterBar from "../FilterBar/FilterBar";
import ConfigurationBar from "../ConfigurationBar/ConfigurationBar";
import InfoHeader from "../InfoHeader/InfoHeader";
import TaskList from "../TaskList/TaskList";

const userTasks = [
  {taskId: 0, description: "Kill all heretics", category: "Kill", modificationDate: new Date()},
  {taskId: 1, description: "Collect gold", category: "Plunder", modificationDate: new Date()},
  {taskId: 2, description: "Prospero", category: "Burn", modificationDate: new Date()}
];

const availableCategories = ["Burn", "Kill", "Plunder"];

class TaskMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: userTasks,
      filteringValue: ""
    }
  }

  handleTaskDelete = (taskId) => {
    this.setState((previousState) => ({
      tasks: previousState.tasks.filter(task => task.taskId !== taskId)
    }));
  }

  handleTaskAdd = (newTasks) => {
    this.setState((previousState) => {
      const tasks = previousState.tasks.slice(0, previousState.tasks.length);
      const date = new Date();
      newTasks.forEach(task => tasks.push({...task, taskId: tasks.length, modificationDate: date}));

      return {tasks: tasks};
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
  }

  handleFiltering = (value) => {
    this.setState({filteringValue: value});
  }

  render() {
    const {filteringValue, tasks} = this.state;
    const filteredTasks = tasks.filter(task => task.description.includes(filteringValue));

    return (
      <div className="Menu">
        <FilterBar filteringValue={filteringValue} onFilter={this.handleFiltering}/>
        <ConfigurationBar categories={availableCategories} onAdd={this.handleTaskAdd}/>
        <InfoHeader taskAmount={filteredTasks.length}/>
        <TaskList
          tasks={filteredTasks}
          filteringValue={filteringValue}
          categories={availableCategories}
          onEdit={this.handleTaskEdit}
          onDelete={this.handleTaskDelete}
        />
      </div>
    );
  }
}

export default TaskMenu;