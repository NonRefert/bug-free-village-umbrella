import "./TaskContainer.css"
import React from "react";
import TaskInputForm from "../TaskInputForm/TaskInputForm";
import { connect } from "react-redux";
import { modifyTask, removeTask } from "../../actions/TaskAction";

const mapStateToProps = state => {
  return { categories: state.categories }
}

const mapDispatchToProps = dispatch => {
  return {
    onEdit: taskInfo => dispatch(modifyTask(taskInfo)),
    onDelete: taskId => dispatch(removeTask(taskId))
  };
}

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
    this.props.onEdit(taskInfo);
    this.toggleInputComponent();
  }

  render() {
    const taskId = this.props.taskId;

    return (
      <div className="TaskContainer">
        <div className="Task">
          <div className="Description">
            <span>{this.props.description}</span>
          </div>
          <div className="Configuration">
            <button className="Edit btn btn-warning" onClick={this.toggleInputComponent}>Edit</button>
            <button className="Delete btn btn-danger" onClick={() => this.props.onDelete(taskId)}>Delete</button>
          </div>
        </div>
        {this.state.showEditInputComponent && <TaskInputForm
          taskId={taskId}
          currentCategory={this.props.currentCategory}
          description={this.props.description}
          categories={this.props.categories}
          onSubmit={this.handleEdit}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);