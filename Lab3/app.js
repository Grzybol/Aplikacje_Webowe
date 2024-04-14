function Stopwatch() {
    const [time, setTime] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1); //nie wiem czy towina online edytora, ale prz
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    function startTimer() {
        setIsActive(true);
    }

    function stopTimer() {
        setIsActive(false);
    }

    function resetTimer() {
        setIsActive(false);
        setTime(0);
    }
  
  function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}s ${milliseconds}ms`;
}

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>{formatTime(time)}</h2>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

function TodoApp() {
    const [tasks, setTasks] = React.useState([]);
    const [input, setInput] = React.useState("");

    function handleAddTask() {
        if (input.trim() !== "") {
            const newTasks = [...tasks, { id: Date.now(), text: input, completed: false }];
            setTasks(newTasks);
            setInput("");
        }
    }

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function toggleTaskCompletion(taskId) {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    }

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div>
            <h1>Todo List</h1>
            <input value={input} onChange={handleInputChange} />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {activeTasks.map(task => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => toggleTaskCompletion(task.id)}>Complete</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Completed Tasks ({completedTasks.length})</h2>
            <ul>
                {completedTasks.map(task => (
                    <li key={task.id}>{task.text}</li>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Stopwatch />);
ReactDOM.createRoot(document.getElementById('todolist')).render(<TodoApp />);
