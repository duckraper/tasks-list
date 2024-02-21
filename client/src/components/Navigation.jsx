import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CreatingContext from '../contexts/CreatingContext';
import AuthContext from '../contexts/AuthContext';

export function Navigation() {
    const { creating } = useContext(CreatingContext)
    const { logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const logOut = () => {
        if (confirm('Are you sure you want to logout?')) {
            logoutUser()
            navigate('/login')
        } else {
            navigate('/tasks')
        }
    }

    return (
        <div className='flex justify-between py-3 px-4'>
            <Link to="/tasks">
                <h1 className='font-bold text-3xl mb-4'>
                    TaskApp
                </h1>
            </Link>
            {!creating && (
                <div className='flex flex-row gap-2'>
                    <Link to="/tasks-create">
                        <button className='bg-inherit border-solid border-zinc-600 hover:border-2 border px-3 py-2 rounded-lg' >
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffff"><rect fill="none" height="24" width="24" /><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z" /></svg>
                        </button>
                    </Link>
                    <div>
                        <button onClick={logOut} className='bg-inherit border-solid border-red-500 hover:border-2 border px-3 py-2 rounded-lg' >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
}
