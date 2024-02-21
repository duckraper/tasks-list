import { TasksList } from "../components/TasksList.jsx"
import { useContext } from "react"
import { useEffect } from "react"
import CreatingContext from "../contexts/CreatingContext.jsx"

export function TasksPage() {
    let { setCreating } = useContext(CreatingContext)

    useEffect(() => {
        setCreating(false)
    }, [setCreating])

    return <TasksList/>
}