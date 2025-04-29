// src/components/ProgramList.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';
import programData from '../programs.json';
import summaryImage from '../assets/summary.jpg'; 

/* Styled Components */
const ListContainer = styled.div`
font-family: 'Poppins', sans-serif;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Title = styled.h1`
font-family: 'Poppins', sans-serif;
  font-size: 32px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 20px; /* Adjusted margin slightly */

  @media (max-width: 768px) { font-size: 28px; margin-bottom: 15px; }
  @media (max-width: 480px) { font-size: 24px; margin-bottom: 15px; }
`;

// --- NEW: Styled Component for the image below the title ---
const ListHeaderImage = styled.img`
  display: block;             /* To allow margin auto centering */
  width: 100%;                /* Responsive width */
  max-width: 900px;           /* Optional: Set a max-width if needed */
  height: auto;               /* Maintain aspect ratio */
  margin: 0 auto 30px auto;   /* Center horizontally, add 30px space below */
  border-radius: 8px;         /* Optional: Add rounded corners */
  object-fit: cover;          /* Optional: Adjust image fitting */
  box-shadow: 0 3px 6px rgba(0,0,0,0.1); /* Optional: subtle shadow */
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
  padding: 10px 0;
  @media (min-width: 769px) { flex-wrap: nowrap; }
  @media (max-width: 768px) { flex-wrap: wrap; justify-content: center; }
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterButton = styled.button`
  display: flex; align-items: center;
  background-color: ${(props) => (props.active ? '#007BFF' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#ffffff' : '#333')};
  border: none; border-radius: 25px; padding: 10px 20px; cursor: pointer;
  transition: background-color 0.3s; font-size: 16px; font-family: 'Poppins', sans-serif;
  box-shadow: ${(props) => (props.active ? '0 4px 12px rgba(0, 123, 255, 0.4)' : 'none')};
  white-space: nowrap;
  &:hover { background-color: ${(props) => (props.active ? '#0056b3' : '#e0e0e0')}; }
  svg { margin-right: 8px; }
  @media (max-width: 768px) { font-size: 15px; padding: 8px 18px; }
  @media (max-width: 480px) { font-size: 14px; padding: 6px 16px; gap: 6px; }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px; box-sizing: border-box;
  @media (max-width: 1024px) { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
  @media (max-width: 768px) { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
  @media (max-width: 480px) { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
`;

const ProgramCard = styled.div`
  display: flex; background-color: white; border: 1px solid #ddd;
  padding: 15px; border-radius: 15px; cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
  align-items: center;
  &:hover { box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2); transform: translateY(-5px); }
  img { width: 80px; height: 80px; object-fit: cover; margin-right: 15px; border-radius: 8px; }
  .content { flex: 1; }
  .content h3 { font-size: 20px; color: #007BFF; margin-bottom: 10px; }
  .content p { font-size: 16px; color: #555; }
  @media (max-width: 480px) { padding: 10px; .content p { display: none; } img { width: 60px; height: 60px; margin-right: 10px; } .content h3 { font-size: 16px; margin-bottom: 6px; } }
`;
// --- End Styled Components ---

const ProgramList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (programName) => {
    if (!programName) { console.error("Program name is undefined..."); return; }
    const encodedProgramName = encodeURIComponent(programName);
    navigate(`/program-detail/${encodedProgramName}`);
  };

  useEffect(() => {
    const savedFilter = sessionStorage.getItem('programFilter');
    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('programFilter', filter);
  }, [filter]);

  const filteredPrograms = React.useMemo(() => {
    if (filter === 'All') return programData.programType;
    return Object.keys(programData.programType).reduce((acc, key) => {
      if (key.toLowerCase() === filter.toLowerCase()) acc[key] = programData.programType[key];
      return acc;
    }, {});
  }, [filter]);

  return (
    <ListContainer>
      <Title>Available Programs</Title>

      {/* === ADDED IMAGE BELOW TITLE === */}
      <ListHeaderImage
        src={summaryImage}
        alt="Explore Our Programs"
      />
      {/* ============================== */}


      {/* Filter Buttons */}
      <FilterContainer>
         <FilterButton active={filter === 'All'} onClick={() => setFilter('All')}><FaFilter /> All</FilterButton>
         <FilterButton active={filter === 'International Transfer Program'} onClick={() => setFilter('International Transfer Program')}><FaFilter /> International Transfer Program</FilterButton>
         <FilterButton active={filter === 'Matriculation'} onClick={() => setFilter('Matriculation')}><FaFilter /> Matriculation</FilterButton>
         <FilterButton active={filter === 'Pre-University Program'} onClick={() => setFilter('Pre-University Program')}><FaFilter /> Pre-University Program</FilterButton>
      </FilterContainer>

      {/* Program Grid */}
      <GridContainer>
        {Object.keys(filteredPrograms).map((programType) =>
          Array.isArray(filteredPrograms[programType]) ? filteredPrograms[programType].map((program) => (
            <ProgramCard
              key={program.programName} // Assuming programName is unique for key here
              onClick={() => handleClick(program.programName)}
            >
              {program.logoPlaceholder ? (
                <img src={program.logoPlaceholder} alt={`${program.programName} Logo`} loading="lazy" />
              ) : (
                <img src="/assets/company_logos/default_logo.png" alt="Default Logo" loading="lazy" />
              )}
              <div className="content">
                <h3>{program.programName}</h3>
                {!isMobile && <p>{program.description.substring(0, 100)}...</p>}
              </div>
            </ProgramCard>
          )) : null
        )}
      </GridContainer>
    </ListContainer>
  );
};

export default ProgramList;