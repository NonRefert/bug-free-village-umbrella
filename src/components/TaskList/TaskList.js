import React from "react";
import "./TaskList.css"
import TaskContainer from "../TaskContainer/TaskContainer";

class TaskList extends React.Component {
  render() {
    const tasksByCategories = {}
    this.props.tasks
      .filter(task => task.description.includes(this.props.filteringValue))
      .forEach(taskInfo => {
        const {taskId, description, category} = taskInfo;
        const categoryArray = tasksByCategories[category];
        const taskRow =
          <li key={taskId}>
            <TaskContainer
              description={description}
              taskId={taskId}
              currentCategory={category}
              categories={this.props.categories}
              onEdit={this.props.onEdit}
              onDelete={() => this.props.onDelete(taskId)}
            />
          </li>

        categoryArray ? categoryArray.push(taskRow) : tasksByCategories[category] = [taskRow];
      });

    const taskElements = [];
    for (const category in tasksByCategories) {
      taskElements.push(<h2>{category}</h2>);
      taskElements.push(<ul className="TaskList">{tasksByCategories[category]}</ul>);
    }

    return (
      <div>
        {taskElements}
      </div>
    );
  }
}

export default TaskList;