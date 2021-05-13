import React from "react";
import "./TaskInputForm.css"
import "../TaskInfoInput/TaskInfoInput"
import TaskInfoInput from "../TaskInfoInput/TaskInfoInput";

class TaskInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskId: props.taskId,
      description: props.description,
      category: props.currentCategory
    }
  }

  render() {
    const {description, category, taskId} = this.state;

    return (
      <div>
        <TaskInfoInput
          description={description}
          currentCategory={category}
          inputIdentifier={taskId}
          categories={this.props.categories}
          onDescriptionUpdate={value => this.setState({description: value})}
          onCategoryUpdate={value => this.setState({category: value})}
        />
        <button onClick={() => this.props.onSubmit({...this.state})}>Submit</button>
      </div>
    )
  }
}

export default TaskInputForm;