import taskReducer from "./TaskReducer";
import categoryReducer from "./CategoryReducer";

const initialState = {
    tasks: [
        {taskId: 0, description: "Karfagen", category: "Burn", modificationDate: new Date()},
        {taskId: 1, description: "Kill all heretics", category: "Kill", modificationDate: new Date()},
        {taskId: 2, description: "Collect gold", category: "Plunder", modificationDate: new Date()},
        {taskId: 3, description: "Kill all xenoses", category: "Kill", modificationDate: new Date()},
        {taskId: 4, description: "Prospero", category: "Burn", modificationDate: new Date()},
        {taskId: 5, description: "Collect silver", category: "Plunder", modificationDate: new Date()}
    ],
    categories: ["Burn", "Kill", "Plunder"]
};

function rootReducer(state = initialState, action) {
    return {
        tasks: taskReducer(state.tasks, action),
        categories: categoryReducer(state.categories, action)
    };
}

export default rootReducer;
