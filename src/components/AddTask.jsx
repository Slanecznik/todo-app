export const AddTask =({
                            text,
                            setText,
                            addTask,
                            inputRef
                        }) => {

    // Обрабатываем отправку формы
    const handleSubmit = (e) => {

        // Не даём браузеру перезагрузить страницу
        e.preventDefault();

        // Вызываем существующую функцию добавления задачи
        addTask();
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
}