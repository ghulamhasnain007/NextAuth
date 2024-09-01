"use client"
import axios from 'axios';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

// Define the types for your context
interface User {
    _id: string;
    name: string;
    email: string;
    // Add any other properties that your user object might have
}

interface UserContextType {
    loginUser: User | null;
    setLoginUser: (user: User | null) => void;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
    loginUser: null,
    setLoginUser: () => {}
});


export function UserWrapper({ children }: { children: ReactNode }) {

    const [loginUser, setLoginUser] = useState<User | null>(null);

    const fetchUser = async() => {
        try {
            const response = await axios.post('/api/users/me');
            console.log(response.data.data);
            setLoginUser(response.data.data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <UserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the UserContext
export function useUserContext() {
    return useContext(UserContext);
}
