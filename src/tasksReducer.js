export const tasksReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    done: false
                }
            ];

        case "DELETE_TASK":
            return state.filter(
                (task) => task.id !== action.payload
            );

        default:
            return state;
    }
};