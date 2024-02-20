import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../apis/tasks.api.js'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast'

//* Formulario para CRUD
export function TaskFormPage() {
    // Importamos el hook useForm de react-hook-form para manejar el estado del formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    // Función para mostrar un toast de éxito o error
    const showToast = (message, success = true) => {
        (success ? toast.success : toast.error)(message, {
            position: 'bottom-right',
            style: {
                color: '#fff',
                background: '#10101050'
            }
        })
    }

    // Obtenemos los parámetros de la URL
    const params = useParams();

    // Obtenemos la función navigate de react-router-dom para redireccionar
    const navigate = useNavigate();

    // Cargamos los datos de la tarea si estamos en modo edición
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

    // Función para manejar el envío del formulario
    const onSubmit = handleSubmit(async (data) => {
        // Crear tarea
        if (!params.id) {
            try {
                await createTask(data);
                showToast('Task created');
            } catch (error) {
                console.error(`error en la promesa: ${error}`);
                showToast('Task could not be created', false);
            }
        // Editar tarea
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

    // Función para capitalizar el título al escribirlo
    const capitalizeTitle = (e) => {
        e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                {/* Input para el título */}
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
                {/* Mensaje de error si el título es requerido */}
                {errors.title && <span>title is required</span>}
                {/* Textarea para la descripción */}
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
                {/* Botón para guardar el formulario */}
                <button
                    className='bg-indigo-500 p-3 rounded-md block w-full mt-3'
                    type='submit'>
                    Save
                </button>
            </form>

            {/* En caso de estar editando, mostramos el botón de eliminar */}
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
                </div>
            )}
        </div>
    )
    // TODO implementar la realizacion de tareas, o sea tarea completada
}
