import React from "react";
import "./index.css"
import "../Input"
import TaskInputForm from "../Input";

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

  render() {
    return (
      <div>
        <button onClick={this.toggleAddTaskComponent}>Add task</button>
        {this.state.showAddInputComponent && <TaskInputForm onSubmit={this.props.onAdd}/>}
      </div>
    );
  }
}

export default ConfigurationBar;