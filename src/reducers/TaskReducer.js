import {ADD_TASK, MODIFY_TASK, REMOVE_TASK} from "../constants/action-types";

export default function taskReducer(state, action) {
    switch (action) {
        case ADD_TASK:
            return [...state, action.payload];
        case MODIFY_TASK:
            return modifyTask(state, action.payload);
        case REMOVE_TASK:
            return state.filter(task => task.taskId !== action.payload);
        default:
            return state;
    }
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