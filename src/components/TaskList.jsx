props.tasks.map((task) => (

    <TaskItem

        key={task.id}

        task={task}

        deleteTask={props.deleteTask}

        toggleTask={props.toggleTask}

    />

))