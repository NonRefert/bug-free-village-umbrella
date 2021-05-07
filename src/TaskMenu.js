import React from "react";
import './css/TaskMenu.css';

const userTasks = [
    {taskId: 1, description: "Kill all heretics", modificationDate: new Date()},
    {taskId: 2, description: "Restore emperor's body", modificationDate: new Date()},
    {taskId: 3, description: "Cadia stands", modificationDate: new Date()}
];

function TaskContainer(props) {
    return (
        <div className="Task">
            <p>{props.taskDescription}</p>
            <button className="Edit" onClick={() => props.onEdit(props.taskId)}>Edit</button>
            <button className="Delete" onClick={() => props.onDelete(props.taskId)}>Delete</button>
        </div>
    );
}

class TaskList extends React.Component {
    render() {
        const tasks = this.props.tasks
            .filter((taskInfo) => taskInfo.description.indexOf(this.props.filteringValue) !== -1)
            .map((taskInfo) =>
                <li key={taskInfo.taskId}>
                    <TaskContainer
                        taskDescription={taskInfo.description}
                        onEdit={() => this.props.onEdit(taskInfo.taskId)}
                        onDelete={() => this.props.onDelete(taskInfo.taskId)}
                    />
                </li>);
        return (
            <div className="Task-List">
                <ul>
                    {tasks}
                </ul>
            </div>
        );
    }
}

function InfoHeader(props) {
    return (
        <div className="InfoHeader">
            <h2>{`${props.taskAmount} tasks todo`}</h2>
        </div>
    );
}

function FilterBar(props) {
    return (
        <fieldset>
            <input type="text" placeholder="Search..." value={props.filteringValue}
                   onChange={(e) => props.onFilter(e.target.value)}
            />
        </fieldset>
    );
}

class TaskMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: userTasks,
            filteringValue: ""
        }
    }

    handleTaskDelete = (taskId) => {
        this.setState((previousState) => ({
            tasks: previousState.tasks.filter(task => task.taskId !== taskId)
        }));
    }
    handleTaskEdit = (taskId) => {
        console.log("TODO edit")
    }

    handleFiltering = (value) => {
        this.setState({filteringValue: value})
    }

    render() {
        const {filteringValue, tasks} = this.state;
        const filteredTasks = tasks.filter(task => task.description.indexOf(filteringValue) !== -1);

        return (
            <div className="App">
                <FilterBar filteringValue={filteringValue} onFilter={this.handleFiltering}/>
                <InfoHeader taskAmount={filteredTasks.length}/>
                <TaskList
                    tasks={filteredTasks}
                    filteringValue={filteringValue}
                    onEdit={this.handleTaskEdit}
                    onDelete={this.handleTaskDelete}
                />
            </div>
        );
    }
}

export default TaskMenu;
