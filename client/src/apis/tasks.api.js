import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export const TasksBaseURL = "http://127.0.0.1:8000/api/tasks/"
export const TokensBaseURL = "http://127.0.0.1:8000/api/token/"
export const UsersBaseURL = "http://127.0.0.1:8000/api/users/"

const tasksApi = axios.create({
    baseURL: TasksBaseURL,
});

const tokensApi = axios.create({
    baseURL: TokensBaseURL,
});

const usersApi = axios.create({
    baseURL: UsersBaseURL,
});

export const getAuthTokens = (data) => tokensApi.post("/", data);
export const refreshToken = (data) => tokensApi.post("/refresh/", data);

export const getTask = (id) => tasksApi.get(`/${id}/`);
export const getAllTasks = () => tasksApi.get("/");
export const createTask = (data) => tasksApi.post("/", data);
export const updateTask = (id, data) => tasksApi.put(`/${id}/`, data);
export const deleteTask = (id) => tasksApi.delete(`/${id}/`);
export const completeTask = (id) => tasksApi.get(`/${id}/complete/`);

export const createUser = (data) => usersApi.post("/", data);
export const getUser = (id) => usersApi.get(`/${id}/`);
export const editUser = (id, data) => usersApi.patch(`/${id}/`, data);
export const deleteUser = (id) => usersApi.delete(`/${id}/`);

export const useAuthTokens = () => {
    const { authTokens } = useContext(AuthContext);

    tasksApi.interceptors.request.use((config) => {
        console.log()
        const token = authTokens().access;
        console.log(`el token: ${token}`)
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    })

}