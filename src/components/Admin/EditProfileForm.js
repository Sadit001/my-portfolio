import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';

const EditProfileForm = () => {
    const { portfolioData, updateProfile } = usePortfolio();
    const [formData, setFormData] = useState(portfolioData.profile);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setFormData(portfolioData.profile);
    }, [portfolioData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
        }}>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Profile Image Upload */}
                <div>
                    <label style={labelStyle}>Profile Picture</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {formData.profileImage && (
                            <img
                                src={formData.profileImage}
                                alt="Profile"
                                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData({ ...formData, profileImage: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Role / Title</label>
                        <input
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Bio</label>
                    <textarea
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <h3 style={{ fontSize: '1rem', marginTop: '1rem' }}>Social Media Links</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Facebook URL</label>
                        <input
                            name="facebook"
                            value={formData.socialLinks?.facebook || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                            })}
                            style={inputStyle}
                            placeholder="https://facebook.com/..."
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Instagram URL</label>
                        <input
                            name="instagram"
                            value={formData.socialLinks?.instagram || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                            })}
                            style={inputStyle}
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>LinkedIn URL</label>
                        <input
                            name="linkedin"
                            value={formData.socialLinks?.linkedin || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                            })}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>GitHub URL</label>
                        <input
                            name="github"
                            value={formData.socialLinks?.github || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: { ...formData.socialLinks, github: e.target.value }
                            })}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <button type="submit" style={primaryBtn}>
                    <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
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
    width: 'fit-content'
};

export default EditProfileForm;
