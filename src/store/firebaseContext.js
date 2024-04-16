import { createContext, useState } from "react";

export const firebaseContext = createContext();


export const authContext = createContext();
export default function Context ({children}) {

    const [user, setUser] = useState('');

    return(
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    )
}