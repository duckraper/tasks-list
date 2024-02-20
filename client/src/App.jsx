import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TasksPage } from "./pages/TasksPage.jsx"
import { TaskFormPage } from "./pages/TaskFormPage.jsx"
import { Navigation } from "./components/Navigation.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <BrowserRouter>
            <div className='container mx-auto px-3'>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Navigate to="/tasks" />}></Route>
                    <Route path="/tasks" element={<TasksPage />}></Route>
                    <Route path="/tasks-create" element={<TaskFormPage />}></Route>
                    <Route path="/tasks/:id" element={<TaskFormPage />} />
                </Routes>
                <Toaster />
            </div>
        </BrowserRouter>
    )
}

export default App 