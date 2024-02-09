import { useForm } from 'react-hook-form'
import { createTask } from '../apis/tasks.api.js'

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await createTask(data);
            console.log(response);
            return response;
        } catch (error) {
            console.error(`error en la promesa: ${error}`);
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input autoFocus type='text' placeholder='title' {...register("title", { required: true })} />
                {errors.title && <span>title is required</span>}
                <textarea rows='3' placeholder='description' {...register("description", { required: false })} />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}
