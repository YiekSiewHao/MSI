import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mentorData from '../mentors.json';
import scholarshipData from '../scholarships.json';

// Simple CSS-in-JS for quick setup
const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  searchBar: { 
    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', 
    fontSize: '16px', marginBottom: '30px' 
  },
  grid: { 
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' 
  },
  card: { 
    border: '1px solid #eee', borderRadius: '12px', padding: '20px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backgroundColor: '#fff' 
  },
  tag: { 
    display: 'inline-block', backgroundColor: '#eef2ff', color: '#4f46e5', 
    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' 
  },
  link: { color: '#2563eb', textDecoration: 'none', fontSize: '14px', marginTop: '10px', display: 'block' }
};

const AlumniGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten the nested JSON so we can filter and map easily
  const allMentors = mentorData.flatMap(program => 
    program.mentors.map(m => ({ ...m, programName: program.programName }))
  );

  const filteredMentors = allMentors.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Scholarship Alumni Directory</h1>
        <p>Connect with seniors who have successfully secured these scholarships.</p>
      </header>

      <input 
        type="text" 
        placeholder="Search by name or scholarship (e.g. Petronas, Luke...)" 
        style={styles.searchBar}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={styles.grid}>
        {filteredMentors.map((mentor, index) => {
          // Check if the scholarship exists in our main details file
          const scholarshipExists = scholarshipData.some(s => s.shortName === mentor.programName);

          return (
            <div key={index} style={styles.card}>
              <span style={styles.tag}>{mentor.programName}</span>
              <h3 style={{ margin: '10px 0 5px 0' }}>{mentor.name}</h3>
              
              {mentor.instagram && (
                <a href={`https://instagram.com/${mentor.instagram}`} target="_blank" rel="noreferrer" style={styles.link}>
                  📷 Instagram: @{mentor.instagram}
                </a>
              )}
              {mentor.linkedin && (
                <a href={`https://linkedin.com/in/${mentor.linkedin}`} target="_blank" rel="noreferrer" style={styles.link}>
                  🔗 LinkedIn Profile
                </a>
              )}

              <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />
              
              {scholarshipExists ? (
                <Link to={`/scholarship/${mentor.programName.toLowerCase()}`} style={{ color: '#059669', fontWeight: 'bold', textDecoration: 'none' }}>
                  View Scholarship Requirements →
                </Link>
              ) : (
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>Details coming soon</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlumniGallery;