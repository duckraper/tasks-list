import { createContext } from "react"
import { useState } from "react"

const CreatingContext = createContext()

export default CreatingContext

// eslint-disable-next-line react/prop-types
export const CreatingProvider = ({ children }) => {
    let [creating, setCreating] = useState(false)

    return (
        <CreatingContext.Provider value={{ creating, setCreating }}>
            {children}
        </CreatingContext.Provider>
    )
}