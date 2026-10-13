
type Task = {
    id: number;
    text: string;
    done: boolean;
};

type Action =
    | { type: "ADD_TASK"; payload: string }
    | { type: "DELETE_TASK"; payload: number }
    | { type: "TOGGLE_TASK"; payload: number }
    | {
    type: "EDIT_TASK";
    payload: {
        id: number;
        text: string;
    };
}
    | { type: "CLEAR_COMPLETED" };

export const tasksReducer = (
    state: Task[],
    action: Action
): Task[] => {
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
            return state.map((task) =>
                task.id === action.payload
                    ? { ...task, done: !task.done }
                    : task
            );

        case "EDIT_TASK":
            return state.map((task) =>
                task.id === action.payload.id
                    ? {
                        ...task,
                        text: action.payload.text
                    }
                    : task
            );

        case "CLEAR_COMPLETED":
            return state.filter((task) => !task.done);

        default:
            return state;
    }
};
