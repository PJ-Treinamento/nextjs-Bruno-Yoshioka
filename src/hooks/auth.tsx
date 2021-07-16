import { AuthContextData, AuthState, LoginCredentials } from 'interfaces';
import React, { useContext, useState, createContext } from 'react';

import { setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import api from '../services/api';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [userData, setUserData] = useState<AuthState>({} as AuthState);

    const router = useRouter();

    const login = async ({ email, password }: LoginCredentials) => {
        const response = await api.post('/sessions/login/', {
            email,
            password
        });
        const { token, user } = response.data;
        const { username } = user;
        setCookie(undefined, 'piupiuwerAuth.token', token, {
            maxAge: 60 * 60 * 1 // 1 hour
        });
        setCookie(undefined, 'piupiuwerAuth.username', username, {
            maxAge: 60 * 60 * 1 // 1 hour
        });
        setUserData({ token, user });
        router.push('/feed');
    };

    const logout = () => {
        destroyCookie(undefined, 'piupiuwerAuth.token');
        destroyCookie(undefined, 'piupiuwerAuth.user');
        setUserData({} as AuthState);
        router.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user: userData.user,
                token: userData.token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
