import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const HeroSection = () => {
    const { portfolioData } = usePortfolio();
    const { name, role, bio, email, location, profileImage, socialLinks } = portfolioData.profile;

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '60px'
        }}>
            <div style={{ maxWidth: '800px', textAlign: 'center', padding: '0 1rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {profileImage && (
                        <div style={{ marginBottom: '2rem' }}>
                            <img
                                src={profileImage}
                                alt={name}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '4px solid var(--primary)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}
                            />
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span style={{
                        color: 'var(--primary)',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}>
                        Hello, I'm
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        margin: '1rem 0',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '800'
                    }}>
                        {name}
                    </h1>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        color: 'var(--secondary)',
                        marginBottom: '1.5rem'
                    }}>
                        {role}
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.8',
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                    }}>
                        {bio}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {socialLinks?.github && (
                            <a href={socialLinks.github} target="_blank" rel="noreferrer" style={iconBtn} title="GitHub">
                                <Github size={20} />
                            </a>
                        )}
                        {socialLinks?.linkedin && (
                            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={iconBtn} title="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        )}
                        {socialLinks?.facebook && (
                            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" style={iconBtn} title="Facebook">
                                <Facebook size={20} />
                            </a>
                        )}
                        {socialLinks?.instagram && (
                            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" style={iconBtn} title="Instagram">
                                <Instagram size={20} />
                            </a>
                        )}
                        <a href={`mailto:${email}`} style={iconBtn} title="Email Me">
                            <Mail size={20} />
                        </a>
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-secondary)'
                    }}>
                        <MapPin size={16} />
                        <span>{location}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const iconBtn = {
    padding: '0.75rem',
    borderRadius: '50%',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
    cursor: 'pointer',
    textDecoration: 'none'
};

export default HeroSection;
