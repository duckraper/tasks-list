import axios from 'axios'

// export const getAllTasks = () => {
//     return axios.get("http://localhost:8000/tasks/")
// }

// export const createTask = (task) => {
//     return axios.post("http://localhost:8000/tasks/", task)
// }

const tasksApi = axios.create({
    baseURL: "http://localhost:8000/tasks/",
});

export const getTask = (id) => { return tasksApi.get(`/${id}/`) };
export const getAllTasks = () => { return tasksApi.get("/") };
export const createTask = (task) => { return tasksApi.post("/", task) };
export const updateTask = (id, task) => { return tasksApi.put(`/${id}/`, task) };
export const deleteTask = (id) => { return tasksApi.delete(`/${id}/`) } 