import React from "react";
import "./TaskList.css"
import TaskContainer from "../TaskContainer/TaskContainer";

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks
      .map((taskInfo) =>
        <li key={taskInfo.taskId}>
          <TaskContainer
            description={taskInfo.description}
            taskId={taskInfo.taskId}
            currentCategory={taskInfo.category}
            categories={this.props.categories}
            onEdit={this.props.onEdit}
            onDelete={() => this.props.onDelete(taskInfo.taskId)}
          />
        </li>);

    return (
      <div className="Task-List">
        <ul>
          {tasks}
        </ul>
      </div>
    );
  }
}

export default TaskList;