import React from "react";
import "./TaskMenu.css"
import FilterBar from "../FilterBar/FilterBar";
import ConfigurationBar from "../ConfigurationBar/ConfigurationBar";
import TaskList from "../TaskList/TaskList";

const availableCategories = ["Burn", "Kill", "Plunder"];

const userTasks = [
  {taskId: 0, description: "Karfagen", category: "Burn", modificationDate: new Date()},
  {taskId: 1, description: "Kill all heretics", category: "Kill", modificationDate: new Date()},
  {taskId: 2, description: "Collect gold", category: "Plunder", modificationDate: new Date()},
  {taskId: 3, description: "Kill all xenoses", category: "Kill", modificationDate: new Date()},
  {taskId: 4, description: "Prospero", category: "Burn", modificationDate: new Date()},
  {taskId: 5, description: "Collect silver", category: "Plunder", modificationDate: new Date()}
];

class TaskMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: userTasks,
      categories: availableCategories,
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

  handleCategoryAdding = (value) => {
    this.setState((previousState) => ({categories: [...previousState.categories, value]}));
  }

  render() {
    const {filteringValue, tasks, categories} = this.state;

    return (
      <div className="Menu">
        <FilterBar filteringValue={filteringValue} onFilter={this.handleFiltering}/>
        <ConfigurationBar
          categories={categories}
          onTaskAdd={this.handleTaskAdd}
          onCategoryAdd={this.handleCategoryAdding}
        />
        <TaskList
          tasks={tasks}
          filteringValue={filteringValue}
          categories={categories}
          onEdit={this.handleTaskEdit}
          onDelete={this.handleTaskDelete}
        />
      </div>
    );
  }
}

export default TaskMenu;