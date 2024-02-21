import LoginForm from "../components/LoginForm";


const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center m-10 p-6 gap-2 items-center">
            <h1 className="text-center font-bold text-2xl">Login</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage