/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
    const navigate = useNavigate();
    return (
        <div
            className="bg-zinc-800 hover:bg-zinc-700 p-3 hover:cursor-pointer"
            onClick={() => {
                navigate(`/tasks/${task.id}`);
            }}>
            <h2 className="font-bold uppercase overflow-hidden text-ellipsis">{task.title}</h2>
            <p className="text-slate-300 overflow-hidden text-ellipsis">{task.description}</p>
        </div>
    );
}
