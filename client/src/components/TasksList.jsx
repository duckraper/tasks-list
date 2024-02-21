import { useContext, useEffect, useState } from "react"
import { TasksBaseURL } from "../apis/tasks.api.js"
import { TaskCard } from "./TaskCard.jsx"
import axios from "axios";
import AuthContext from "../contexts/AuthContext.jsx";

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    let { authTokens } = useContext(AuthContext)

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await axios.get(TasksBaseURL, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error(`error al cargar la promesa: ${error}`)
            }
        }
        loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-3 truncate overflow-y-scroll">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}