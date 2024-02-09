import { useEffect, useState } from "react"
import { getAllTasks } from "../apis/tasks.api.js"
import { TaskCard } from "./TaskCard.jsx"

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {

        async function loadTasks() {
            try {
                const response = await getAllTasks();
                console.log(response);
                setTasks(response.data);
            } catch (error) {
                console.error(`error al cargar la promesa: ${error}`)
            }
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