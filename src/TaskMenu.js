import React from "react";
import './css/TaskMenu.css';

const addTaskInputComponent = "addTask"
const editTaskInputComponent = "editTask"

const userTasks = [
    {taskId: 0, description: "Kill all heretics", modificationDate: new Date()},
    {taskId: 1, description: "Restore emperor's body", modificationDate: new Date()},
    {taskId: 2, description: "Cadia stands", modificationDate: new Date()}
];

function TaskContainer(props) {
    return (
        <div className="Task">
            <p>{props.taskDescription}</p>
            <button className="Edit" onClick={() => props.onEdit()}>Edit</button>
            <button className="Delete" onClick={() => props.onDelete()}>Delete</button>
        </div>
    );
}

class TaskList extends React.Component {
    render() {
        const tasks = this.props.tasks
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

function ConfigurationBar(props) {
    return (
        <div>
            <input type="text" placeholder="Search..." value={props.filteringValue}
                   onChange={(element) => props.onFilter(element.target.value)}
            />
            <button onClick={() => props.onAdd()}>Add task</button>
        </div>
    );
}

class InputComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        }
    }

    updateValue = (element) => {
        this.setState({
            value: element.target.value
        })
    }

    componentDidMount() {
        console.log("Element was created")
    }

    componentWillUnmount() {
        console.log("Element was destroyed")
    }

    render() {
        return(
            <fieldset>
                <input type="text" value={this.state.value} onChange={this.updateValue}/>
                <button onClick={() => this.props.onSubmit(this.state.value)}>Submit</button>
            </fieldset>
        )
    }
}

class TaskMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: userTasks,
            filteringValue: "",
            showAddInputComponent: false,
            showEditInputComponent: false,
            currentEditableTask: -1
        }
    }

    toggleComponent = (component) => {
        switch (component) {
            case addTaskInputComponent:
                this.setState((state) => ({showAddInputComponent: !state.showAddInputComponent}));
                break;
            case editTaskInputComponent:
                this.setState((state) => ({showEditInputComponent: !state.showEditInputComponent}));
                break;
            default:
                return;
        }
    }

    handleTaskDelete = (taskId) => {
        this.setState((previousState) => ({
            tasks: previousState.tasks.filter(task => task.taskId !== taskId)
        }));
    }

    handleTaskAdd = (description) => {
        this.setState((previousState) => {
            const {tasks} = previousState;
            return {
                tasks: [...tasks, {taskId: tasks.length, description: description, modificationDate: new Date()}],
            };
        });
        this.toggleComponent(addTaskInputComponent)
    }

    handleTaskEdit = (description, taskId) => {
        this.setState((previousState) => {
            const {tasks: previousTasks, currentEditableTask} = previousState;

            const index = previousTasks.findIndex(task => task.taskId === currentEditableTask);
            const tasks = [
                ...previousTasks.slice(0, index),
                {taskId: currentEditableTask, description: description, modificationDate: new Date()},
                ...previousTasks.slice(index + 1, previousTasks.length)
            ]

            return {tasks: tasks}
        });
        this.toggleComponent(editTaskInputComponent)
    }

    handleFiltering = (value) => {
        this.setState({filteringValue: value});
    }

    render() {
        const {filteringValue, tasks} = this.state;
        const filteredTasks = tasks.filter(task => task.description.indexOf(filteringValue) !== -1);

        return (
            <div className="App">
                <ConfigurationBar
                    filteringValue={filteringValue} onFilter={this.handleFiltering}
                    onAdd={() => this.toggleComponent(addTaskInputComponent)}
                />
                {this.state.showAddInputComponent && <InputComponent onSubmit={this.handleTaskAdd}/>}
                {this.state.showEditInputComponent && <InputComponent onSubmit={this.handleTaskEdit}/>}
                <InfoHeader taskAmount={filteredTasks.length}/>
                <TaskList
                    tasks={filteredTasks}
                    filteringValue={filteringValue}
                    onEdit={(taskId) => {
                        this.setState({currentEditableTask: taskId})
                        this.toggleComponent(editTaskInputComponent)
                    }}
                    onDelete={this.handleTaskDelete}
                />
            </div>
        );
    }
}

export default TaskMenu;
