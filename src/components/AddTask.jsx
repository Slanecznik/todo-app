import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export const AddTask = ({
                            text,
                            setText,
                            inputRef
                        }) => {

    const { dispatch } = useContext(TasksContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedText = text.trim();

        if (!trimmedText) {
            return;
        }

        dispatch({
            type: "ADD_TASK",
            payload: trimmedText
        });

        setText("");
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="add-task">
            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите задачу..."
            />

            <button type="submit">
                Добавить
            </button>
        </form>
    );
};