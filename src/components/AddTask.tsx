
import { useContext } from "react";
import type {
    Dispatch,
    FormEvent,
    RefObject,
    SetStateAction
} from "react";
import { TasksContext } from "../context/TasksContext";

type AddTaskProps = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement | null>;
};

export const AddTask = ({
                            text,
                            setText,
                            inputRef
                        }: AddTaskProps) => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error(
            "AddTask must be used within TasksContext.Provider"
        );
    }

    const { addTask } = context;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedText = text.trim();

        if (!trimmedText) {
            return;
        }

        addTask(trimmedText);
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
