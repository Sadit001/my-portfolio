import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { login, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isLogin) {
            const result = await login(email, password);
            if (result.success) {
                navigate('/admin');
            } else {
                // Formatting firebase errors to be more user friendly
                const msg = result.message.includes('auth/invalid-credential')
                    ? 'Invalid email or password'
                    : result.message;
                setError(msg);
            }
        } else {
            const result = await resetPassword(email);
            if (result.success) {
                setSuccess('Password reset link sent to your email!');
                setIsLogin(true);
            } else {
                setError(result.message);
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--dark-bg)',
            padding: '1rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--primary)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: 'white'
                    }}>
                        <Lock size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {isLogin ? 'Admin Login' : 'Reset Password'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {isLogin ? 'Enter your credentials to access the dashboard' : 'Enter your email to reset your password'}
                    </p>
                </div>

                {(error || success) && (
                    <div style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        background: error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        color: error ? '#ef4444' : '#22c55e',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                    }}>
                        {error || success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <div style={inputWrapperStyle}>
                                <Mail size={18} style={iconStyle} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@portfolio.com"
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>

                        {isLogin ? (
                            <div>
                                <label style={labelStyle}>Password</label>
                                <div style={inputWrapperStyle}>
                                    <Lock size={18} style={iconStyle} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label style={labelStyle}>New Password</label>
                                <div style={inputWrapperStyle}>
                                    <Lock size={18} style={iconStyle} />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New secure password"
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <button type="submit" style={buttonStyle}>
                            {isLogin ? 'Sign In' : 'Reset Password'} <ArrowRight size={18} />
                        </button>
                    </div>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setSuccess('');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto'
                        }}
                    >
                        {isLogin ? 'Forgot your password?' : <><ArrowLeft size={14} /> Back to Login</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500'
};

const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
};

const iconStyle = {
    position: 'absolute',
    left: '1rem',
    color: 'var(--text-secondary)'
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.75rem',
    background: 'var(--dark-bg)',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    color: 'var(--text-primary)',
    fontSize: '0.95rem'
};

const buttonStyle = {
    width: '100%',
    padding: '0.875rem',
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem'
};

export default Login;
