import {ADD_TASKS, MODIFY_TASK, REMOVE_TASK} from "../constants/action-types";

export function addTasks(newTasks) {
    return {type: ADD_TASKS, payload: newTasks};
}

export function modifyTask(taskInfo) {
    return {type: MODIFY_TASK, payload: taskInfo};
}

export function removeTask(taskId) {
    return {type: REMOVE_TASK, payload: taskId};
}