import React, { useState } from 'react';

function AdminPanel({ data, onUpdate }) {
    const [editData, setEditData] = useState(data);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        // Save to localStorage or backend
        localStorage.setItem('portfolioData', JSON.stringify(editData));
        onUpdate(editData);
        setIsEditing(false);
    };

    return (
        <div className="admin-panel">
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Mode'}
            </button>

            {isEditing && (
                <div className="edit-form">
                    <label>Name:</label>
                    <input
                        value={editData.profile.name}
                        onChange={(e) => setEditData({
                            ...editData,
                            profile: { ...editData.profile, name: e.target.value }
                        })}
                    />
                    {/* More editable fields */}
                    <button onClick={handleSave}>Save Changes</button>
                </div>
            )}
        </div>
    );
}