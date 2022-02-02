import { createContext, ReactNode } from 'react'
import { api } from '../services/api'

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthcontextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    isAthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthcontextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const isAthenticated = false

    async function signIn({ email, password }: SignInCredentials){
        try {
            const response = await api.post('sessions', { 
                email, 
                password 
            })
    
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}