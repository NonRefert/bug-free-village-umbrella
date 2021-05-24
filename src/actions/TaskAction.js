import {ADD_TASK, MODIFY_TASK, REMOVE_TASK} from "../constants/action-types";

export function addTask(payload) {
    return {type: ADD_TASK, payload: payload};
}

export function modifyTask(payload) {
    return {type: MODIFY_TASK, payload: payload};
}

export function removeTask(taskId) {
    return {type: REMOVE_TASK, payload: taskId};
}