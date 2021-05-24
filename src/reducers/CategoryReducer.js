import { ADD_CATEGORY, MODIFY_CATEGORY } from "../constants/action-types";

export default function categoryReducer(state, action) {
    switch (action) {
        case ADD_CATEGORY:
            return [...state, action.payload];
        case MODIFY_CATEGORY:
            return modifyCategory(state, action.payload);
        default:
            return state;
    }
}

function modifyCategory(categories, payload) {
    const {category, updatedName} = payload;
    const index = categories.indexOf(category);

    return [...categories.slice(0, index), updatedName, ...categories.slice(index + 1, categories.length)];
}