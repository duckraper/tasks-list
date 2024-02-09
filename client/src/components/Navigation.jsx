import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <div className='flex justify-between py-3 px-4'>
            {/* boton para ir a Inicio */}
            <Link to="/tasks">
                <h1 className='font-bold text-3xl mb-4'>
                    TaskApp
                </h1>
            </Link>
            {/* Crear tarea */}
            <Link to="/tasks-create">
                <button className='bg-indigo-500 px-3 py-2 rounded-lg'>
                    Create Task
                </button>
            </Link>
        </div >
    );
}
