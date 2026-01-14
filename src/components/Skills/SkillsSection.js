import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';

const SkillsSection = () => {
    const { portfolioData } = usePortfolio();
    const { skills } = portfolioData;

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    fontSize: '2.5rem'
                }}>My Skills</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((skill) => (
                        <div key={skill.id} style={{
                            background: 'var(--card-bg)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '600' }}>{skill.name}</span>
                                <span style={{ color: 'var(--secondary)' }}>{skill.level}%</span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '8px',
                                background: 'var(--dark-bg)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))'
                                    }}
                                />
                            </div>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                {skill.category}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SkillsSection;
