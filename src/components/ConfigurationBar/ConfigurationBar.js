import React from "react";
import "./ConfigurationBar.css"
import "../TaskInputForm/TaskInputForm"
import MultitaskInputForm from "../MultitaskInputForm/MultitaskInputForm";
import { connect } from "react-redux";
import { addTasks } from "../../actions/TaskAction";

const mapStateToProps = state => {
  return { categories: state.categories }
}

const mapDispatchToProps = dispatch => {
  return {onTaskAdding: taskInfo => dispatch(addTasks(taskInfo))}
}

class ConfigurationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddInputComponent: false
    }
  }

  toggleAddTaskComponent = () => {
    this.setState((previousState) => ({
      showAddInputComponent: !previousState.showAddInputComponent
    }));
  }

  handleTaskAdding = (taskInfo) => {
    this.props.onTaskAdding(taskInfo);
    this.toggleAddTaskComponent();
  }

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.toggleAddTaskComponent}>Add task</button>
        {this.state.showAddInputComponent && <MultitaskInputForm
          categories={this.props.categories}
          onSubmit={(taskInfo) => this.handleTaskAdding(taskInfo)}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationBar);