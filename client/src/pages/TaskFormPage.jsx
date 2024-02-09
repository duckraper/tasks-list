import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../apis/tasks.api.js'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast'

//* Formulario para CRUD
export function TaskFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

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
            if (params.id) {
                try {
                    const response = await getTask(params.id);
                    setValue('title', response.data.title);
                    setValue('description', response.data.description);
                } catch (error) {
                    console.error(`error al cargar la promesa: ${error}`);
                    navigate('/tasks');
                }
            }
        }
        loadTask();
    }, [params.id, setValue, navigate])

    const onSubmit = handleSubmit(async (data) => {
        // crear tarea
        if (!params.id) {
            try {
                await createTask(data);
                showToast('Task created');
            } catch (error) {
                console.error(`error en la promesa: ${error}`);
                showToast('Task could not be created', false);
            }
            // editar tarea
        } else {
            try {
                await updateTask(params.id, data);
                showToast('Task updated');
            } catch (error) {
                console.error(`error en la promesa: ${error}`);
                showToast('Task could not be updated', false);
            }
        }
        navigate('/tasks');
    });

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
                    // {params.id ?
                    //     value = {}}
                    {...register("title", {
                        required: true,
                        onChange: capitalizeTitle,
                        maxLength: {
                            value: 50,
                            message: "title is too long",
                        }
                    })} />
                {/* TODO mejorar la UI de la validacion */}
                {errors.title && <span>title is required</span>}
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

            {/* en caso de estar editando */}
            {params.id && (
                <div className='flex justify-end'>
                    <button
                        className='bg-red-600 p-3 rounded-lg w-full mt-3 '
                        onClick={async () => {
                            const accepted = window.confirm('are you sure?');
                            if (accepted) {
                                try {
                                    await deleteTask(params.id)
                                    navigate('/tasks');
                                    showToast('Task deleted');
                                } catch (error) {
                                    console.error(`error en la promesa: ${error}`);
                                    showToast('Task could not be deleted', false);
                                }
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>)}
        </div>
    )
    // TODO implementar la realizacion de tareas, o sea tarea completada
}
