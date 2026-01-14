import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Trash2, Plus } from 'lucide-react';

const SkillManager = () => {
    const { portfolioData, addSkill, removeSkill } = usePortfolio();
    const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Frontend' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newSkill.name) return;
        addSkill(newSkill);
        setNewSkill({ name: '', level: 50, category: 'Frontend' });
    };

    return (
        <div>
            {/* Add New Skill */}
            <div style={{
                background: 'var(--card-bg)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                marginBottom: '2rem'
            }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Add New Skill</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Skill Name</label>
                        <input
                            type="text"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            style={inputStyle}
                            placeholder="e.g. React"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Level (0-100)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={newSkill.level}
                            onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Category</label>
                        <select
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                            style={inputStyle}
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Languages">Languages</option>
                            <option value="Design">Design</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </div>
                    <button type="submit" style={primaryBtn}>
                        <Plus size={18} /> Add
                    </button>
                </form>
            </div>

            {/* List Skills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {portfolioData.skills.map(skill => (
                    <div key={skill.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'var(--card-bg)',
                        padding: '1rem',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)'
                    }}>
                        <div>
                            <p style={{ fontWeight: '600' }}>{skill.name}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{skill.category} • {skill.level}%</p>
                        </div>
                        <button
                            onClick={() => removeSkill(skill.id)}
                            style={{ color: '#ef4444', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
    gap: '0.5rem'
};

export default SkillManager;
