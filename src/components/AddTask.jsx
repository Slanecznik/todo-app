// ==================== AddTask ====================

function AddTask({

                     text,
                     setText,
                     addTask,
                     inputRef

                 }) {

    return (

        <div className="add-task">

            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        addTask();

                    }

                }}
                placeholder="Новая задача"
            />

            <button onClick={addTask}>
                Добавить
            </button>

        </div>

    );

}

export default AddTask;