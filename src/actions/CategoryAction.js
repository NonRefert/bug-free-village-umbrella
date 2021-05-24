import { ADD_CATEGORY, MODIFY_CATEGORY } from "../constants/action-types";

export function addCategory(payload) {
    return {action : ADD_CATEGORY, payload: payload};
}

export function modifyCategory(category, updatedName) {
    return {action: MODIFY_CATEGORY, payload: {category: category, updatedName: updatedName}};
}
