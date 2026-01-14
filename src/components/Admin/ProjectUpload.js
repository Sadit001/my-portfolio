function ProjectUpload({ projects, setProjects }) {
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: null,
        link: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProject({ ...newProject, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const addProject = () => {
        setProjects([...projects, newProject]);
        // Save to localStorage
    };

    // Render upload form
}