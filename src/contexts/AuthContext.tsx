import { createContext, ReactNode, useState } from 'react'
import Router from 'next/router'
import { api } from '../services/api'

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    user: User;
    isAthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAthenticated = !!user;

    async function signIn({ email, password }: SignInCredentials){
        try {
            const response = await api.post('sessions', { 
                email, 
                password 
            })

            const { permissions, roles } = response.data

            setUser({
                email,
                permissions,
                roles
            })
    
            Router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}