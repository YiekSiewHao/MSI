// src/components/ProgramDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import programsData from '../programs.json';
import { ArrowBack, ArrowUpward } from '@mui/icons-material';

// --- Styled Components ---
const DetailsContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 40px 10px; max-width: 1100px; margin: 0 auto; box-sizing: border-box;
  @media (max-width: 768px) { padding: 20px 10px; }
`;

const BackButton = styled.button`
  background-color: #007BFF; color: white; border: none; padding: 10px 15px; border-radius: 8px;
  font-size: 16px; cursor: pointer; margin-bottom: 20px; display: inline-flex; align-items: center;
  transition: background-color 0.3s ease;
  svg { margin-right: 5px; }
  &:hover { background-color: #0056b3; }
`;

const QuickListContainer = styled.div`
  margin-bottom: 40px; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;
  @media (max-width: 768px) { gap: 12px; }
  @media (max-width: 480px) { gap: 10px; }
`;

const QuickListItem = styled.button`
  font-family: 'Poppins', sans-serif; background-color: #4a90e2; color: white;
  border: none; padding: 10px 18px; border-radius: 20px; font-size: 14px;
  cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  ${(props) =>
    props.active &&
    css`
      background-color: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    `}

  &:hover {
    background-color: #357ab8; transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) { padding: 8px 16px; font-size: 13px; }
  @media (max-width: 480px) { padding: 6px 14px; font-size: 12px; }
`;

const Title = styled.h1`
  font-size: 32px; color: #007BFF; text-align: center; margin-bottom: 30px;
  @media (max-width: 768px) { font-size: 26px; margin-bottom: 20px; }
`;

// Enhanced Section styling to include h3, h4, table styles
const Section = styled.div`
  margin-bottom: 30px;
  h2 { /* Section Title */
    font-size: 24px; color: #007BFF; margin-bottom: 15px;
    border-bottom: 2px solid #007BFF; padding-bottom: 5px;
  }
  h3 { /* Subheadings within Static Section */
    font-size: 20px; color: #0056b3; margin-top: 20px; margin-bottom: 10px;
  }
  h4 { /* Subject Object Keys */
    font-size: 18px; color: #0056b3; margin-top: 15px; margin-bottom: 8px;
    font-weight: bold;
  }
  p, ul, li { font-family: 'Poppins', sans-serif; font-size: 16px; color: #555; line-height: 1.6; }
  ul { list-style-type: disc; padding-left: 20px; margin-top: 5px; }
  li { margin-bottom: 8px; }
  /* Specific styling for nested lists within the object rendering part */
  div > ul { padding-left: 25px; margin-top: 5px; }

  /* Table Style - Added from original static section example */
  table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 15px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; color: #333; font-weight: bold; }
  tr:nth-child(even) { background-color: #f9f9f9; }
  p small i { /* Style for the small italic note below the table */
     font-size: 0.9em; color: #666;
  }
`;

const BackToTopButton = styled.button`
  position: fixed; bottom: 20px; right: 40px; background-color: #007BFF; color: white;
  border: none; padding: 10px 20px; border-radius: 12px; cursor: pointer; display: flex;
  align-items: center; gap: 8px; font-size: 16px; font-weight: bold; z-index: 1000;
  transition: background-color 0.3s ease, transform 0.3s ease-in-out;
  &:hover { background-color: #0056b3; transform: scale(1.05); }
  svg { font-size: 20px; }
   @media (max-width: 480px) { right: 50%; transform: translateX(50%); font-size: 14px; padding: 8px 15px; &:hover { transform: translateX(50%); } }
`;
// --- End Styled Components ---

const ProgramDetails = () => {
  const navigate = useNavigate();
  const { programName } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [allProgramNames, setAllProgramNames] = useState([]);

  // Effect to find program and populate quick list
  useEffect(() => {
    setLoading(true);
    let foundProgram = null;
    const flattenedNames = [];

    for (const type in programsData.programType) {
      if (programsData.programType.hasOwnProperty(type) && Array.isArray(programsData.programType[type])) {
        programsData.programType[type].forEach(p => {
          if (p.programName) {
            flattenedNames.push(p.programName);
            if (decodeURIComponent(programName) === p.programName) {
              foundProgram = p;
            }
          }
        });
      }
    }

    flattenedNames.sort((a, b) => a.localeCompare(b));
    setAllProgramNames(flattenedNames);
    setProgram(foundProgram);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [programName]);

  // Effect for Back to Top button visibility
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // --- Helper Functions ---
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleBackToHome = () => navigate('/', { state: { scrollTo: 'programList' } });

  const handleQuickListClick = (name) => {
    window.scrollTo(0, 0);
    navigate(`/program-detail/${encodeURIComponent(name)}`);
  };

  // Helper function to render subjects (handles array or object)
  const renderSubjects = (subjectsData) => {
    if (Array.isArray(subjectsData)) {
      if (subjectsData.length === 0) return <p>No specific subjects listed.</p>;
      return (
        <ul>
          {subjectsData.map((subject, index) => (<li key={`sub-arr-${index}`}>{subject}</li>))}
        </ul>
      );
    } else if (typeof subjectsData === 'object' && subjectsData !== null) {
      const entries = Object.entries(subjectsData);
      if (entries.length === 0) return <p>No specific subjects listed.</p>;
      return (
        <div>
          {entries.map(([key, valueList]) => (
            <div key={`sub-obj-${key}`}>
              <h4>{key}</h4>
              {Array.isArray(valueList) && valueList.length > 0 ? (
                <ul>
                  {valueList.map((item, index) => (<li key={`${key}-${index}`}>{item}</li>))}
                </ul>
              ) : ( <p>Details not available for {key}.</p> )}
            </div>
          ))}
        </div>
      );
    }
    return <p>Subject information is unavailable or in an unexpected format.</p>;
  };
  // --- End Helper Functions ---

  // --- Render Logic ---
  if (loading) { return <DetailsContainer>Loading program details...</DetailsContainer>; }

  const decodedProgramName = decodeURIComponent(programName);

  if (!program) {
    return (
      <DetailsContainer>
        {/* Added "Back to List" text */}
        <BackButton onClick={handleBackToHome}><ArrowBack /> </BackButton>
        <Title>Program Not Found</Title>
        <p>Could not find details for a program named "{decodedProgramName}". Check the name or go back to the list.</p>
      </DetailsContainer>
    );
  }

  // Destructure program-specific details
    const {
    programName: name,
    description = "No description available.",
    // Ensure this is here!
    pathwayDescriptions = {}, 
    entryRequirements = "Details not specified.",
    duration = "N/A",
    // Mapping 'prograssion' typo from JSON to 'pathway' variable
    progression = "N/A", 
    institutions = [],
    cost = "N/A",
    CareerPathway: careerPathway = [],
    Limitation: limitation = "N/A",
    Bestfor: bestFor = "N/A"
   } = program || {}; // Adding || {} prevents crashing if program is null

    const safeDescription = description ?? "No description available.";

  return (
    <>
      <DetailsContainer>
        {/* Back Button - Added "Back to List" text */}
        <BackButton onClick={handleBackToHome}>
          <ArrowBack /> 
        </BackButton>

        {/* Quick List Container */}
        <QuickListContainer>
          {allProgramNames.map((pName) => (
            <QuickListItem
              key={pName}
              active={pName === decodedProgramName}
              onClick={() => handleQuickListClick(pName)}
            >
              {pName}
            </QuickListItem>
          ))}
        </QuickListContainer>

        {/* Program Title */}
        <Title>{name}</Title>

        {/* --- Render DYNAMIC Program Sections --- */}
        {/* Check if we have ANY reason to show this section */}
        {(description || (pathwayDescriptions && Object.keys(pathwayDescriptions).length > 0)) ? (
          <Section>
            <h2>Description</h2>
            
            {/* 1. The Main Description - Full text for Details page */}
            {description && description !== "No description available." && (
              <p style={{ whiteSpace: 'pre-line', marginBottom: '20px' }}>
                {description}
              </p>
            )}

            {/* 2. Specific Pathways */}
            {pathwayDescriptions && typeof pathwayDescriptions === 'object' && 
              Object.entries(pathwayDescriptions).map(([pathwayName, pathwayDesc], index) => (
                <div key={`pathway-desc-${index}`} style={{ marginTop: '15px' }}>
                  <h4 style={{ color: '#0056b3', marginBottom: '5px' }}>{pathwayName}</h4>
                  {pathwayDesc && (
                    <p style={{ whiteSpace: 'pre-line' }}>{pathwayDesc}</p>
                  )}
                </div>
              ))
            }
          </Section>
        ) : null}

        {/* Entry Requirements Section */}
        {entryRequirements && entryRequirements !== "Details not specified." && (
          <Section>
            <h2>Entry Requirements</h2>
            <p>{entryRequirements}</p>
          </Section>
        )}

        {duration && duration !== "N/A" && <Section><h2>Duration</h2><p>{duration}</p></Section>}
        {progression && progression !== "N/A" && <Section><h2>Progression</h2><p>{progression}</p></Section>}
        {Array.isArray(institutions) && institutions.length > 0 && (
          <Section><h2>Institutions</h2><ul>{institutions.map((inst, idx) => <li key={`inst-${idx}`}>{inst}</li>)}</ul></Section>
        )}
        {cost && cost !== "N/A" && <Section><h2>Cost</h2><p>{cost}</p></Section>}
        {/* ============================================= */}

        {/* Career Pathways */}
        {Array.isArray(careerPathway) && careerPathway.length > 0 && (
          <Section>
            <h2>Career Pathways</h2>
            <ul>
              {careerPathway.map((path, idx) => <li key={`career-${idx}`}>{path}</li>)}
            </ul>
          </Section>
        )}

        {/* Limitations */}
        {limitation && limitation !== "N/A" && (
          <Section>
            <h2>Limitations</h2>
            <p style={{ color: '#d32f2f', fontWeight: '500' }}>{limitation}</p>
          </Section>
        )}

        {/* Best For */}
        {bestFor && bestFor !== "N/A" && (
          <Section>
            <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #2196f3' }}>
              <h2 style={{ marginTop: 0 }}>Best For</h2>
              <p>{bestFor}</p>
            </div>
          </Section>
        )}

        {/* Back To Top Button */}
        {isVisible && (<BackToTopButton onClick={scrollToTop}><ArrowUpward /> Back To Top</BackToTopButton>)}
      </DetailsContainer>
    </>
  );
};

 export default ProgramDetails;