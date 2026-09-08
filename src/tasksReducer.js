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

        case "TOGGLE_TASK":
            return state.map((task) => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        done: !task.done
                    };
                }

                return task;
            });

        case "EDIT_TASK":
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        text: action.payload.text
                    };
                }

                return task;
            });

        case "CLEAR_COMPLETED":
            return state.filter((task) => !task.done);

        default:
            return state;
    }
};