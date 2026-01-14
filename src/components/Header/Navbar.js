import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, User } from 'lucide-react';

const Navbar = () => {

    return (
        <nav style={{
            padding: '1.5rem 2rem',
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 50,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--primary)'
                }}>
                    <Terminal size={28} />
                    <span>Portfolio</span>
                </Link>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                    {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            style={{
                                color: 'var(--text-secondary)',
                                fontWeight: '500',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                        >
                            {item}
                        </a>
                    ))}
                    {process.env.REACT_APP_MODE === 'admin' && (
                        <Link to="/admin" style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <User size={16} /> Edit
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
