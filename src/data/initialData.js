export const initialData = {
    profile: {
        name: "Alex Developer",
        role: "Full Stack Engineer",
        bio: "I build accessible, pixel-perfect, and performant web experiences. Passionate about modern UI/UX and scalable backend systems.",
        email: "alex@example.com",
        location: "San Francisco, CA",
        profileImage: "", // Base64 string or URL
        socialLinks: {
            facebook: "",
            instagram: "",
            linkedin: "https://linkedin.com",
            github: "https://github.com"
        }
    },
    skills: [
        { id: 1, name: "React", level: 90, category: "Frontend" },
        { id: 2, name: "Node.js", level: 85, category: "Backend" },
        { id: 3, name: "TypeScript", level: 80, category: "Languages" },
        { id: 4, name: "UI/UX Design", level: 75, category: "Design" }
    ],
    projects: [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A comprehensive dashboard for managing products, orders, and analytics. Built with React and Recharts.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            tags: ["React", "Dashboard", "Analytics"],
            link: "#"
        },
        {
            id: 2,
            title: "Social Media App",
            description: "Real-time social platform with chat features. Implemented using Socket.io and MongoDB.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
            tags: ["Node.js", "Socket.io", "MongoDB"],
            link: "#"
        },
        {
            id: 3,
            title: "AI Image Generator",
            description: "Web application that uses Open AI API to generate images from text prompts.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
            tags: ["OpenAI", "React", "API"],
            link: "#"
        }
    ]
};
