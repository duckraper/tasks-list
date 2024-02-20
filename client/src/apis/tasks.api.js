import axios from 'axios'

const tasksApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/tasks/",
});

const tokensApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/token/",
})

export const getAuthTokens = (data) => tokensApi.post("/", data);
export const refreshToken = (data) => tokensApi.post("/refresh/", data);

export const getTask = (id) => tasksApi.get(`/${id}/`)
export const getAllTasks = () => tasksApi.get("/")
export const createTask = (data) => tasksApi.post("/", data)
export const updateTask = (id, data) => tasksApi.put(`/${id}/`, data)
export const deleteTask = (id) => tasksApi.delete(`/${id}/`) 
