import React from "react";
import "./TaskList.css"
import TaskContainer from "../TaskContainer/TaskContainer";
import InfoHeader from "../InfoHeader/InfoHeader";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { tasks: state.tasks }
}

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
            />
          </li>

        categoryArray ? categoryArray.push(taskRow) : tasksByCategories[category] = [taskRow];
      });

    const listElements = [];
    for (const category in tasksByCategories) {
      const tasks = tasksByCategories[category];

      listElements.push(<h1>{category}</h1>);
      listElements.push(<InfoHeader taskAmount={tasks.length}/>)
      listElements.push(<ul className="TaskList">{tasks}</ul>);
    }

    return (
      <div>
        {listElements}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TaskList);