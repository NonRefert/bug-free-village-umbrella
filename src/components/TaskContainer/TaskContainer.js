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
          <div className="Description">
            <span>{this.props.description}</span>
          </div>
          <div className="Configuration">
            <button className="Edit btn btn-warning" onClick={this.toggleInputComponent}>Edit</button>
            <button className="Delete btn btn-danger" onClick={this.props.onDelete}>Delete</button>
          </div>
        </div>
        {this.state.showEditInputComponent && <TaskInputForm
          taskId={this.props.taskId}
          currentCategory={this.props.currentCategory}
          description={this.props.description}
          categories={this.props.categories}
          onSubmit={this.handleEdit}
        />}
      </div>
    );
  }
}

export default TaskContainer;