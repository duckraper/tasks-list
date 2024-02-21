import { useForm } from 'react-hook-form'
import { TasksBaseURL } from '../apis/tasks.api.js'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.jsx';
import CreatingContext from '../contexts/CreatingContext.jsx';

//* Formulario para CRUD
export function TaskFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    let { authTokens } = useContext(AuthContext)
    let { setCreating } = useContext(CreatingContext)

    const showToast = (message, success = true) => {
        (success ? toast.success : toast.error)(message, {
            position: 'bottom-right',
            style: {
                color: '#fff',
                background: '#10101050'
            }
        })
    }

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function loadTask() {
            setCreating(true)

            if (params.id) {
                try {
                    const response = await axios.get(`${TasksBaseURL}${params.id}/`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authTokens.access}`
                        }
                    });
                    setValue('title', response.data.title);
                    setValue('description', response.data.description);
                } catch (error) {
                    console.error(`error al cargar la promesa: ${error}`);
                    navigate('/tasks');
                }
            }
        }
        loadTask();
    }, [params.id, authTokens.access, navigate, setValue, setCreating])

    const onSubmit = handleSubmit(async (data) => {
        if (!params.id) {
            try {
                await axios.post(`${TasksBaseURL}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authTokens.access}`
                    }
                })
                showToast('Task created');
            } catch (error) {
                console.error(`error en la promesa: ${error}`);
                showToast('Task could not be created', false);
            }
            // Editar tarea
        } else {
            try {
                await axios.patch(`${TasksBaseURL}${params.id}/`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authTokens.access}`
                    }
                })
                showToast('Task updated');
            } catch (error) {
                console.error(`error en la promesa: ${error}`);
                showToast('Task could not be updated', false);
            }
        }

        console.log(data)
        setCreating(false)
        navigate('/tasks');
    });

    const deleteTask = async () => {
        const accepted = window.confirm('are you sure?');
        if (accepted) {
            try {
                await axios.delete(`${TasksBaseURL}${params.id}/`, {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                        'Content-Type': 'application/json'
                    }
                })
                navigate('/tasks');
                showToast('Task deleted');
            } catch (error) {
                console.error(`error en la promesa: ${error}`);
                showToast('Task could not be deleted', false);
            }
        }
    }

    const capitalizeTitle = (e) => {
        e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    autoFocus
                    type='text'
                    placeholder='title'
                    {...register("title", {
                        required: true,
                        onChange: capitalizeTitle,
                        maxLength: {
                            value: 50,
                            message: "title is too long",
                        }
                    })} />

                {errors.title && <span className='text-red-500 text-sm'>title is required</span>}

                <textarea
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    rows='3'
                    placeholder='description'
                    {...register("description", {
                        required: false,
                        maxLength: {
                            value: 300,
                            message: "description is too long",
                        }
                    })} />

                <button
                    className='bg-indigo-500 p-3 rounded-md block w-full mt-3'
                    type='submit'>
                    Save
                </button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button
                        className='bg-red-600 p-3 rounded-lg w-full mt-3 '
                        onClick={deleteTask}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
    // TODO implementar la realizacion de tareas, o sea tarea completada
}
