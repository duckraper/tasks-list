import axios from 'axios'

// export const getAllTasks = () => {
//     return axios.get("http://localhost:8000/tasks/")
// }

// export const createTask = (data) => {
//     return axios.post("http://localhost:8000/tasks/", data)
// }

const tasksApi = axios.create({
    baseURL: "http://127.0.0.1:8000/tasks/",
});

//* ---CRUD---
export const getTask = (id) => { return tasksApi.get(`/${id}/`) }; // obtener una tarea
export const getAllTasks = () => { return tasksApi.get("/") }; // obtener todas las tareas (lista)
export const createTask = (data) => { return tasksApi.post("/", data) }; // crear tarea
export const updateTask = (id, data) => { return tasksApi.put(`/${id}/`, data) }; // editar tarea
export const deleteTask = (id) => { return tasksApi.delete(`/${id}/`) } // eliminar tarea
