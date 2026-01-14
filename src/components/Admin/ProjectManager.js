import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectManager = () => {
    const { portfolioData, addProject, removeProject, updateProject } = usePortfolio();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        image: '',
        link: '',
        tags: ''
    });

    const resetForm = () => {
        setProjectForm({ title: '', description: '', image: '', link: '', tags: '' });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleEditClick = (project) => {
        setProjectForm({
            title: project.title,
            description: project.description,
            image: project.image,
            link: project.link,
            tags: project.tags.join(', ')
        });
        setIsEditing(true);
        setEditingId(project.id);

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectForm.title) return;

        const processedProject = {
            ...projectForm,
            tags: projectForm.tags.split(',').map(t => t.trim())
        };

        if (isEditing) {
            updateProject(editingId, processedProject);
        } else {
            addProject(processedProject);
        }
        resetForm();
    };

    return (
        <div>
            {/* Add/Edit Project Form */}
            <motion.div
                layout
                style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    marginBottom: '2rem'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                    {isEditing && (
                        <button onClick={resetForm} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <X size={20} /> Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Project Title</label>
                            <input
                                type="text"
                                value={projectForm.title}
                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                style={inputStyle}
                                placeholder="e.g. Portfolio Website"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Project Image</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setProjectForm({ ...projectForm, image: reader.result });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    style={{
                                        ...inputStyle,
                                        padding: '0.5rem',
                                    }}
                                />
                                {projectForm.image && (
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        border: '1px solid var(--border)',
                                        flexShrink: 0
                                    }}>
                                        <img
                                            src={projectForm.image}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea
                            rows="3"
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            style={inputStyle}
                            placeholder="Brief description of the project..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Tags (comma separated)</label>
                            <input
                                type="text"
                                value={projectForm.tags}
                                onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                                style={inputStyle}
                                placeholder="React, Node, CSS"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Project Link</label>
                            <input
                                type="text"
                                value={projectForm.link}
                                onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                                style={inputStyle}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <button type="submit" style={isEditing ? editBtn : primaryBtn}>
                        {isEditing ? <><Save size={18} /> Update Project</> : <><Plus size={18} /> Add Project</>}
                    </button>
                </form>
            </motion.div>

            {/* Project List */}
            <div style={{ display: 'grid', gap: '1rem' }}>
                <AnimatePresence>
                    {portfolioData.projects.map(project => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: 'var(--card-bg)',
                                padding: '1rem',
                                border: `1px solid ${editingId === project.id ? 'var(--primary)' : 'var(--border)'}`,
                                borderRadius: 'var(--radius)',
                                transition: 'border-color 0.3s'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '60px',
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                                background: '#000'
                            }}>
                                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.1rem' }}>{project.title}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                    {project.description.substring(0, 100)}...
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => handleEditClick(project)}
                                    style={{
                                        color: 'var(--primary)',
                                        padding: '0.75rem',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => removeProject(project.id)}
                                    style={{
                                        color: '#ef4444',
                                        padding: '0.75rem',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' };
const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'var(--dark-bg)',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    color: 'var(--text-primary)'
};
const primaryBtn = {
    background: 'var(--primary)',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
    border: 'none',
    cursor: 'pointer'
};
const editBtn = {
    ...primaryBtn,
    background: '#f59e0b'
};

export default ProjectManager;
