import "./index.css"
import React from "react";

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditInputComponent: false
    }
  }

  render() {
    return (
      <div className="Task">
        <p>{this.props.taskDescription}</p>
        <button className="Edit" onClick={this.props.onEdit}>Edit</button>
        <button className="Delete" onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}

export default TaskContainer;