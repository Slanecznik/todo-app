export const AddTask = ({
                            text,
                            setText,
                            dispatch,
                            inputRef
                        }) => {

    const handleSubmit = (e) => {

        e.preventDefault();

        const trimmedText = text.trim();

        if (trimmedText === "") return;

        dispatch({
            type: "ADD_TASK",
            payload: trimmedText
        });

        setText("");

        inputRef.current.focus();
    };

    return (
        <form
            className="add-task"
            onSubmit={handleSubmit}
        >

            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Новая задача"
            />

            <button type="submit">
                Добавить
            </button>

        </form>
    );
};