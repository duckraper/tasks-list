import { useEffect, useState } from "react"
import { getAllTasks } from "../apis/tasks.api.js"
import { TaskCard } from "./TaskCard.jsx"

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {

        async function loadTasks() {
            const response = await getAllTasks();
            console.log(response);
            setTasks(response.data);
        }
        loadTasks();
    }, [])

    return (
        <div>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}