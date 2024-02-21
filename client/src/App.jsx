import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TasksPage } from "./pages/TasksPage.jsx"
import { TaskFormPage } from "./pages/TaskFormPage.jsx"
// import { Navigation } from "./components/Navigation.jsx";
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './utils/PrivateRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CreatingProvider } from './contexts/CreatingContext.jsx';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CreatingProvider>
                    <div className='container mx-auto px-3'>
                        <Routes>
                            <Route path="/" element={<PrivateRoute />}>
                                <Route path='/' element={<Navigate to="/tasks" />} />
                                <Route path="/tasks" element={<TasksPage />} />
                                <Route path="/tasks-create" element={<TaskFormPage />} />
                                <Route path="/tasks/:id" element={<TaskFormPage />} />
                            </Route>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" />
                            <Route path="/user/:id" />
                        </Routes>
                        <Toaster />
                    </div>
                </CreatingProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App 