import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectsGrid = () => {
    const { portfolioData } = usePortfolio();
    const { projects } = portfolioData;

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    fontSize: '2.5rem'
                }}>Featured Projects</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'var(--card-bg)',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden',
                                border: '1px solid var(--border)'
                            }}
                        >
                            <div style={{
                                height: '200px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{project.title}</h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1rem',
                                    fontSize: '0.9rem'
                                }}>
                                    {project.description}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.75rem',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            color: 'var(--primary)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a href={project.link} style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--primary)',
                                    fontWeight: '500'
                                }}>
                                    View Project <ExternalLink size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectsGrid;
