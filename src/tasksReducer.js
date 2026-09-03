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

        default:
            return state;
    }
};