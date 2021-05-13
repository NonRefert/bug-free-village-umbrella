import "./TaskContainer.css"
import React from "react";
import TaskInputForm from "../TaskInputForm/TaskInputForm";

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditInputComponent: false
    }
  }

  toggleInputComponent = () => {
    this.setState((previousState) => ({
      showEditInputComponent: !previousState.showEditInputComponent
    }))
  }

  handleEdit = (taskInfo) => {
    this.props.onEdit(taskInfo)
    this.setState((previousState) => ({showEditInputComponent: !previousState.showEditInputComponent}));
  }

  render() {
    return (
      <div className="TaskContainer">
        <div className="Task">
          <p>{this.props.description}</p>
          <button className="Edit" onClick={this.toggleInputComponent}>Edit</button>
          <button className="Delete" onClick={this.props.onDelete}>Delete</button>
        </div>
        {this.state.showEditInputComponent && <TaskInputForm
          taskId={this.props.taskId}
          description={this.props.description}
          onSubmit={this.handleEdit}
        />}
      </div>
    );
  }
}

export default TaskContainer;