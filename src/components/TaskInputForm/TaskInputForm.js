import React from "react";
import "./TaskInputForm.css"

class TaskInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskId: props.taskId,
      description: props.description
    }
  }

  componentDidMount() {
    console.log("Element was created");
  }

  componentWillUnmount() {
    console.log("Element was destroyed");
  }

  render() {
    return (
      <fieldset>
        <input type="text"
               value={this.state.description}
               onChange={(element) => this.setState({description: element.target.value})}
        />
        <button onClick={() => this.props.onSubmit({...this.state})}>Submit</button>
      </fieldset>
    )
  }
}

export default TaskInputForm;