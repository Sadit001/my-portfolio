import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, Code, LayoutDashboard, ArrowLeft } from 'lucide-react';
import EditProfileForm from './EditProfileForm';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark-bg)' }}>
            {/* Sidebar */}
            <div style={{
                width: '250px',
                background: 'var(--card-bg)',
                borderRight: '1px solid var(--border)',
                padding: '2rem'
            }}>
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LayoutDashboard size={24} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.25rem' }}>Admin Panel</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                        style={activeTab === 'profile' ? activeBtn : inactiveBtn}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={18} /> Profile
                    </button>
                    <button
                        style={activeTab === 'projects' ? activeBtn : inactiveBtn}
                        onClick={() => setActiveTab('projects')}
                    >
                        <Briefcase size={18} /> Projects
                    </button>
                    <button
                        style={activeTab === 'skills' ? activeBtn : inactiveBtn}
                        onClick={() => setActiveTab('skills')}
                    >
                        <Code size={18} /> Skills
                    </button>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <h1 style={{ marginBottom: '2rem', textTransform: 'capitalize' }}>Manage {activeTab}</h1>

                {activeTab === 'profile' && <EditProfileForm />}
                {activeTab === 'projects' && <ProjectManager />}
                {activeTab === 'skills' && <SkillManager />}
            </div>
        </div>
    );
};

const baseBtn = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius)',
    fontSize: '1rem',
    textAlign: 'left',
    width: '100%',
    transition: 'var(--transition)'
};

const activeBtn = {
    ...baseBtn,
    background: 'var(--primary)',
    color: '#fff'
};

const inactiveBtn = {
    ...baseBtn,
    background: 'transparent',
    color: 'var(--text-secondary)'
};

export default AdminDashboard;
