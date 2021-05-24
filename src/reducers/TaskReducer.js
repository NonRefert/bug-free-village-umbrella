import {ADD_TASKS, MODIFY_TASK, REMOVE_TASK} from "../constants/action-types";

export default function taskReducer(state, action) {
    switch (action.type) {
        case ADD_TASKS:
            return addTasks(state, action.payload);
        case MODIFY_TASK:
            return modifyTask(state, action.payload);
        case REMOVE_TASK:
            return state.filter(task => task.taskId !== action.payload);
        default:
            return state;
    }
}

function addTasks(previousTasks, newTasks) {
    const tasks = previousTasks.slice(0, previousTasks.length);
    const date = new Date();
    newTasks.forEach(task => tasks.push({...task, taskId: tasks.length, modificationDate: date}));

    return tasks;
}

function modifyTask(tasks, taskInfo) {
    const {taskId} = taskInfo;

    return tasks.map(task => {
        if (task.taskId !== taskId) {
            return task;
        }

        return {...taskInfo, modificationDate: new Date()};
    })
}