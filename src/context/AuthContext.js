import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Safety check for dummy/broken auth
        if (!auth || auth.type === 'dummy') {
            console.warn("Auth is not initialized. Skipping auth check.");
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Timeout to prevent infinite loading screen if firebase hangs
        const timeout = setTimeout(() => setLoading(false), 5000);

        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const login = async (email, password) => {
        // DEMO MODE (If Firebase is missing)
        if (!auth || auth.type === 'dummy') {
            if (email === 'admin@portfolio.com' && password === 'password123') {
                setUser({ email, uid: 'demo-admin' });
                return { success: true };
            } else {
                return { success: false, message: 'Invalid demo credentials. Use admin@portfolio.com / password123' };
            }
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, resetPassword, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
