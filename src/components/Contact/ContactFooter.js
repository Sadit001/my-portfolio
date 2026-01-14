import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Github, Linkedin, Send, Phone } from 'lucide-react';

const ContactFooter = () => {
    const { portfolioData } = usePortfolio();
    const { email, socialLinks } = portfolioData.profile;
    const formRef = useRef();

    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Debug: Check if keys are loaded
        if (!process.env.REACT_APP_EMAILJS_SERVICE_ID ||
            !process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
            !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
            alert("EmailJS configuration is missing. Please check your .env file and RESTART the server.");
            console.error("Missing EmailJS Env Vars:", {
                serviceId: !!process.env.REACT_APP_EMAILJS_SERVICE_ID,
                templateId: !!process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                publicKey: !!process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            });
            return;
        }

        setStatus('sending');

        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            formRef.current,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log("EmailJS Success:", result.text);
                setStatus('success');
                setForm({ name: '', email: '', phone: '', message: '' });
                alert("Message sent successfully!");
                setTimeout(() => setStatus('idle'), 3000);
            }, (error) => {
                console.error("EmailJS Failed:", error);
                setStatus('error');
                alert("Failed to send message: " + (error.text || "Unknown error"));
                setTimeout(() => setStatus('idle'), 3000);
            });
    };

    return (
        <footer style={{
            background: 'var(--card-bg)',
            marginTop: '4rem',
            padding: '4rem 2rem',
            borderTop: '1px solid var(--border)',
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '3rem', md: { gridTemplateColumns: '1fr 1fr' } }}>
                {/* Contact Info */}
                <div style={{ textAlign: 'left' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Let's Work Together</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        I'm currently available for freelance projects and open to full-time opportunities.
                        If you have a project that needs some creative touch, let's connect!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        <a href={`mailto:${email}`} style={contactItem}>
                            <Mail size={20} color="var(--primary)" /> {email}
                        </a>
                        <div style={contactItem}>
                            <Phone size={20} color="var(--primary)" /> +1 (555) 000-0000
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {socialLinks?.github && <a href={socialLinks.github} style={iconBtn}><Github size={20} /></a>}
                        {socialLinks?.linkedin && <a href={socialLinks.linkedin} style={iconBtn}><Linkedin size={20} /></a>}
                    </div>
                </div>

                {/* Contact Form */}
                <div style={{
                    background: 'var(--dark-bg)',
                    padding: '2rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)'
                }}>
                    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Your Name</label>
                            <input
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Contact Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Message</label>
                            <textarea
                                name="message"
                                required
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button type="submit" style={submitBtn} disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginTop: '4rem', textAlign: 'center', fontSize: '0.9rem' }}>
                © {new Date().getFullYear()} All rights reserved. Built with React.
            </p>
        </footer>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' };
const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    color: 'var(--text-primary)',
    fontSize: '1rem'
};
const contactItem = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '1.1rem'
};
const iconBtn = {
    padding: '0.75rem',
    borderRadius: '50%',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)'
};
const submitBtn = {
    background: 'var(--primary)',
    color: '#fff',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
};

export default ContactFooter;
