import React, { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';

function About() {
    const [data, setData] = useState(portfolioData.about);

    return (
        <section id="about">
            <h2>About Me</h2>
            <p>{data.description}</p>
            <div className="stats">
                <div className="stat-item">
                    <h3>{data.stats.experience}</h3>
                    <p>Years Experience</p>
                </div>
                {/* Other stats similarly */}
            </div>
        </section>
    );
}
export default About;