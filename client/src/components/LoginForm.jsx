import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';

const LoginForm = () => {
    const {
        register,
        formState: { errors },
    } = useForm()

    let { loginUser } = useContext(AuthContext)

    return (
        <div className="max-w-xl mx-auto">
            <form
                className="flex flex-col"
                onSubmit={loginUser}
            >
                <div className='flex flex-col'>
                    <input
                        autoFocus
                        type='text'
                        placeholder="Enter username"
                        name='username'
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                        {...register('username', {
                            required: true,
                            maxLength: {
                                value: 15,
                                message: "Username is too long",
                            }
                        })}
                    />
                    {errors.username && <span className='text-red-500 text-sm'>Username is required.</span>}
                    <input
                        type='password'
                        placeholder="Enter password"
                        name='password'
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    {errors.password && <span className='text-red-500 text-sm'>Password is required.</span>}
                    <span>
                        Do not have an account ?
                        <Link to="/register" className='text-indigo-600 mx-1 hover:text-indigo-400'>Register here</Link>
                    </span>
                </div>
                <input
                    type='submit'
                    className="bg-indigo-500 p-3 rounded-md block w-full mt-3 hover:bg-indigo-400 cursor-pointer"
                />
            </form>
        </div>
    )
}

export default LoginForm