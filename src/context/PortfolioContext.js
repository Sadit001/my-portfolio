import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { initialData } from '../data/initialData';

const PortfolioContext = createContext();

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};

export const PortfolioProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState(initialData);
    const [loading, setLoading] = useState(true);

    // Initialize/Sync Data from Firestore
    useEffect(() => {
        // We act as if 'portfolio' is a single document or collection of collections
        // For simplicity, let's sync the 'projects' collection

        // Safety check for dummy/broken db
        if (!db || db.type === 'dummy') {
            console.warn("Firestore is not initialized. Using local initialData.");
            setLoading(false);
            return;
        }

        const unsubscribeProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
            const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPortfolioData(prev => ({ ...prev, projects }));
        }, (error) => {
            console.error("Error fetching projects:", error);
        });

        // Sync 'skills' collection
        const unsubscribeSkills = onSnapshot(collection(db, "skills"), (snapshot) => {
            const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPortfolioData(prev => ({ ...prev, skills }));
        }, (error) => {
            console.error("Error fetching skills:", error);
        });

        // Sync 'profile' document (assuming single profile)
        const unsubscribeProfile = onSnapshot(doc(db, "general", "profile"), (doc) => {
            if (doc.exists()) {
                setPortfolioData(prev => ({ ...prev, profile: doc.data() }));
            }
        }, (error) => {
            console.error("Error fetching profile:", error);
        });

        setLoading(false);

        return () => {
            unsubscribeProjects();
            unsubscribeSkills();
            unsubscribeProfile();
        };
    }, []);

    const updateProfile = async (newProfile) => {
        try {
            await setDoc(doc(db, "general", "profile"), newProfile, { merge: true });
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    };

    const addProject = async (project) => {
        try {
            // Remove ID if present, let Firestore generate it
            const { id, ...projectData } = project;
            await addDoc(collection(db, "projects"), projectData);
        } catch (error) {
            console.error("Error adding project: ", error);
        }
    };

    const removeProject = async (projectId) => {
        try {
            await deleteDoc(doc(db, "projects", projectId));
        } catch (error) {
            console.error("Error removing project: ", error);
        }
    };

    const updateProject = async (projectId, updatedProject) => {
        try {
            await updateDoc(doc(db, "projects", projectId), updatedProject);
        } catch (error) {
            console.error("Error updating project: ", error);
        }
    };

    const addSkill = async (skill) => {
        try {
            // Remove ID if present
            const { id, ...skillData } = skill;
            await addDoc(collection(db, "skills"), skillData);
        } catch (error) {
            console.error("Error adding skill: ", error);
        }
    };

    const removeSkill = async (skillId) => {
        try {
            await deleteDoc(doc(db, "skills", skillId));
        } catch (error) {
            console.error("Error removing skill: ", error);
        }
    };

    return (
        <PortfolioContext.Provider value={{
            portfolioData,
            loading,
            updateProfile,
            addProject,
            removeProject,
            updateProject,
            addSkill,
            removeSkill
        }}>
            {children}
        </PortfolioContext.Provider>
    );
};
