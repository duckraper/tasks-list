import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { TokensBaseURL } from "../apis/tasks.api";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()

        try {
            let response = await axios.post(TokensBaseURL, {
                "username": e.target.username.value,
                "password": e.target.password.value
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200) {
                let data = response.data
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
                console.log(user)
                // localStorage.setItem("user", JSON.stringify({ id: user.user_id, username: user.username }));

                navigate("/")
            } else if (response.status === 400) {
                console.log('contrasena o usuario incorrectos')
            } else {
                console.error("Login failed")
            }

        } catch (error) {
            console.error("Login failed", error)
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        // localStorage.removeItem("user")
        navigate('/')
    }

    let updateToken = async () => {
        if (!authTokens) {
            if (loading) {
                setLoading(false)
            }
            return
        }
        try {
            let response = await axios.post("http://localhost:8000/api/token/refresh/", {
                "refresh": authTokens.refresh
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                let data = response.data
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
            } else {
                logoutUser()
            }
        } catch (error) {
            console.error("Token update failed", error)
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)

        return () => clearInterval(interval)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}