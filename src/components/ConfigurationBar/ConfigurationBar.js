import React from "react";
import "./ConfigurationBar.css"
import "../TaskInputForm/TaskInputForm"
import MultitaskInputForm from "../MultitaskInputForm/MultitaskInputForm";

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

  handleAdding = (tasks) => {
    this.props.onTaskAdd(tasks);
    this.toggleAddTaskComponent();
  }

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.toggleAddTaskComponent}>Add task</button>
        {this.state.showAddInputComponent && <MultitaskInputForm
          categories={this.props.categories}
          onSubmit={this.handleAdding}
        />}
      </div>
    );
  }
}

export default ConfigurationBar;