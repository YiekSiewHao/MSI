import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mentorData from '../mentors.json'; // Make sure the path to your JSON is correct
import scholarshipData from '../scholarships.json';

const AlumniGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 1. Flatten the data: Turns "Programs with Mentors" into one big list of people
  const allAlumni = mentorData.flatMap(program => 
    program.mentors.map(m => ({
      ...m,
      programName: program.programName
    }))
  );

  // 2. Filter logic for the search bar
  const filteredAlumni = allAlumni.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
    <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a202c' }}>Scholarship Alumni Gallery</h1>
        <p style={{ color: '#4a5568' }}>Connect with seniors who have walked the path before you.</p>
        </div>

        <input 
        type="text"
        placeholder="Search by name or scholarship..."
        style={{
            width: '100%', padding: '15px', borderRadius: '10px',
            border: '1px solid #e2e8f0', marginBottom: '40px', fontSize: '16px'
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px' 
        }}>
        {filteredAlumni.map((alumnus, index) => (
            <div key={index} style={{
            padding: '25px',
            borderRadius: '15px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #edf2f7',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
            }}>
            <span style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                color: '#4c51bf', 
                backgroundColor: '#ebf4ff',
                padding: '4px 10px',
                borderRadius: '20px',
                textTransform: 'uppercase'
            }}>
                {alumnus.programName}
            </span>
            
            <h3 style={{ marginTop: '12px', fontSize: '1.4rem', color: '#2d3748', marginBottom: '10px' }}>
                {alumnus.name}
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
                {alumnus.instagram && (
                <a 
                    href={`https://instagram.com/${alumnus.instagram}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', color: '#e1306c', textDecoration: 'none', fontSize: '14px' }}
                >
                    <span style={{ marginRight: '8px' }}>📷</span> @{alumnus.instagram}
                </a>
                )}
                {alumnus.linkedin && (
                <a 
                    href={`https://linkedin.com/in/${alumnus.linkedin}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', color: '#0077b5', textDecoration: 'none', marginTop: '8px', fontSize: '14px' }}
                >
                    <span style={{ marginRight: '8px' }}>🔗</span> {alumnus.name}
                </a>
                )}
            </div>
            </div>
        ))}
        </div>
    </div>
    );
}

export default AlumniGallery;