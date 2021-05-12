import React from "react";
import "./index.css"
import TaskContainer from "../TaskContainer";

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks
      .map((taskInfo) =>
        <li key={taskInfo.taskId}>
          <TaskContainer
            taskDescription={taskInfo.description}
            onEdit={() => this.props.onEdit(taskInfo.taskId)}
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