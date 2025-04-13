// src/components/ProgramDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Import css for active state styling if needed for QuickListItem
import styled, { css } from 'styled-components';
import programsData from '../programs.json';
import { ArrowBack, ArrowUpward } from '@mui/icons-material';

// --- Styled Components (Combine relevant styles) ---
const DetailsContainer = styled.div`
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
  white-space: nowrap; // Keep program names on one line

  /* Use the css helper for the active prop */
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

const Section = styled.div`
  margin-bottom: 30px;
  h2 { font-size: 24px; color: #007BFF; margin-bottom: 15px; border-bottom: 2px solid #007BFF; padding-bottom: 5px; }
  /* ADDED: Style for h4 used in renderSubjects for object keys */
  h4 {
    font-size: 18px; color: #0056b3; /* Slightly different color */
    margin-top: 15px; margin-bottom: 8px;
    font-weight: bold;
  }
  p, ul, li { font-family: 'Poppins', sans-serif; font-size: 16px; color: #555; line-height: 1.6; }
  ul { list-style-type: disc; padding-left: 20px; margin-top: 5px; }
  li { margin-bottom: 8px; }
  /* Specific styling for nested lists within the object rendering part */
  div > ul { padding-left: 25px; margin-top: 5px; }
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
  const { programName } = useParams(); // Get program name from URL
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [isVisible, setIsVisible] = useState(false);
  const [allProgramNames, setAllProgramNames] = useState([]); // For quick list

  // Effect to find program and populate quick list
  useEffect(() => {
    setLoading(true);
    let foundProgram = null;
    const flattenedNames = [];

    // Iterate through program types to find the program and collect names
    for (const type in programsData.programType) {
      if (programsData.programType.hasOwnProperty(type) && Array.isArray(programsData.programType[type])) {
        programsData.programType[type].forEach(p => {
          if (p.programName) {
            flattenedNames.push(p.programName);
            // Decode URL parameter before comparing
            if (decodeURIComponent(programName) === p.programName) {
              foundProgram = p;
            }
          }
        });
      }
    }

    flattenedNames.sort((a, b) => a.localeCompare(b)); // Sort names
    setAllProgramNames(flattenedNames);
    setProgram(foundProgram);
    setLoading(false);
    window.scrollTo(0, 0); // Scroll to top on program change
  }, [programName]); // Re-run if programName changes

  // Effect for Back to Top button visibility
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // --- Helper Functions ---
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleBackToHome = () => navigate('/', { state: { scrollTo: 'programList' } }); // Navigate back to list view

  // Handler for clicking a quick list item
  const handleQuickListClick = (name) => {
    window.scrollTo(0, 0);
    // Encode the program name for the URL
    navigate(`/program-detail/${encodeURIComponent(name)}`);
  };


  // === RESTORED: Helper function to render subjects (handles array or object) ===
  const renderSubjects = (subjectsData) => {
    // Case 1: It's an array
    if (Array.isArray(subjectsData)) {
      if (subjectsData.length === 0) return <p>No specific subjects listed.</p>;
      return (
        <ul>
          {subjectsData.map((subject, index) => (
            <li key={`sub-arr-${index}`}>{subject}</li>
          ))}
        </ul>
      );
    }
    // Case 2: It's an object (and not null)
    else if (typeof subjectsData === 'object' && subjectsData !== null) {
      const entries = Object.entries(subjectsData);
      if (entries.length === 0) return <p>No specific subjects listed.</p>;
      return (
        <div>
          {entries.map(([key, valueList]) => (
            // Use key for outer div key
            <div key={`sub-obj-${key}`}>
              {/* Render the key (e.g., "A-Levels", "IB") as a heading */}
              <h4>{key}</h4>
              {/* Check if the value is an array and render its items */}
              {Array.isArray(valueList) && valueList.length > 0 ? (
                <ul>
                  {valueList.map((item, index) => (
                    // Combine key and index for inner list item key
                    <li key={`${key}-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                // Fallback if the value list is not an array or empty
                <p>Details not available for {key}.</p>
              )}
            </div>
          ))}
        </div>
      );
    }
    // Case 3: Unexpected format or null/undefined
    return <p>Subject information is unavailable or in an unexpected format.</p>;
  };
  // ============================================================================


  // --- Render Logic ---
  if (loading) { return <DetailsContainer>Loading program details...</DetailsContainer>; }

  // Decode the program name from URL param for comparison and display
  const decodedProgramName = decodeURIComponent(programName);

  if (!program) {
    return (
      <DetailsContainer>
        <BackButton onClick={handleBackToHome}><ArrowBack /> </BackButton>
        <Title>Program Not Found</Title>
        <p>Could not find details for a program named "{decodedProgramName}". Check the name or go back to the list.</p>
      </DetailsContainer>
    );
  }

  // Destructure program-specific details, providing defaults
  const {
    programName: name, // Use 'name' from the found program object
    description = "No description available.",
    entryRequirements = "Details not specified.",
    subjects = [], // Default to empty array, renderSubjects will handle object type
    duration = "N/A",
    pathway = "N/A",
    accreditation = "N/A",
    institutions = [],
    cost = "N/A",
  } = program;


  return (
    <>
      <DetailsContainer>
        {/* Back Button */}
        <BackButton onClick={handleBackToHome}>
          <ArrowBack /> 
        </BackButton>

        {/* Quick List Container */}
        <QuickListContainer>
          {allProgramNames.map((pName) => (
            <QuickListItem
              key={pName} // Use program name from the list as key
              // Compare with decoded name from URL for active state
              active={pName === decodedProgramName}
              onClick={() => handleQuickListClick(pName)}
            >
              {pName}
            </QuickListItem>
          ))}
        </QuickListContainer>

        {/* Program Title */}
        <Title>{name}</Title> {/* Display the name from the found program object */}

        {/* --- Render Sections using program data --- */}

        {/* Description Section */}
        {description && <Section><h2>Description</h2><p>{description}</p></Section>}

        {/* Entry Requirements Section */}
        {entryRequirements && <Section><h2>Entry Requirements</h2><p>{entryRequirements}</p></Section>}

        {/* === UPDATED: Subjects Section using the helper function === */}
        <Section>
          <h2>Subjects</h2>
          {renderSubjects(subjects)}
        </Section>
        {/* ========================================================== */}

        {/* Duration Section */}
        {duration && duration !== "N/A" && <Section><h2>Duration</h2><p>{duration}</p></Section>}

        {/* Pathway Section */}
        {pathway && pathway !== "N/A" && <Section><h2>Pathway</h2><p>{pathway}</p></Section>}

        {/* Accreditation Section */}
        {accreditation && accreditation !== "N/A" && <Section><h2>Accreditation</h2><p>{accreditation}</p></Section>}

        {/* Institutions Section */}
        {Array.isArray(institutions) && institutions.length > 0 && (
          <Section>
            <h2>Institutions</h2>
            <ul>
              {institutions.map((institution, index) => (
                <li key={`inst-${index}`}>{institution}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* Cost Section */}
        {cost && cost !== "N/A" && <Section><h2>Cost</h2><p>{cost}</p></Section>}


        {/* Back To Top Button */}
        {isVisible && (
          <BackToTopButton onClick={scrollToTop}>
            <ArrowUpward /> Back To Top
          </BackToTopButton>
        )}
      </DetailsContainer>
    </>
  );
};

export default ProgramDetails;