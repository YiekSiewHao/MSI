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
    entryRequirements = "Details not specified.",
    subjects = [],
    duration = "N/A",
    pathway = "N/A",
    accreditation = "N/A",
    institutions = [],
    cost = "N/A",
  } = program;


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
        {description && <Section><h2>Description</h2><p>{description}</p></Section>}
        {entryRequirements && <Section><h2>Entry Requirements</h2><p>{entryRequirements}</p></Section>}
        <Section><h2>Subjects</h2>{renderSubjects(subjects)}</Section>
        {duration && duration !== "N/A" && <Section><h2>Duration</h2><p>{duration}</p></Section>}
        {pathway && pathway !== "N/A" && <Section><h2>Pathway</h2><p>{pathway}</p></Section>}
        {accreditation && accreditation !== "N/A" && <Section><h2>Accreditation</h2><p>{accreditation}</p></Section>}
        {Array.isArray(institutions) && institutions.length > 0 && (
          <Section><h2>Institutions</h2><ul>{institutions.map((inst, idx) => <li key={`inst-${idx}`}>{inst}</li>)}</ul></Section>
        )}
        {cost && cost !== "N/A" && <Section><h2>Cost</h2><p>{cost}</p></Section>}
        {/* ============================================= */}


        {/* === STATIC KEY CONSIDERATIONS SECTION (Integrated) === */}
        <Section>
            <h2>Key Considerations & General Info</h2>

            {/* Entry Requirements Notes */}
            <h3>Entry Requirements Notes</h3>
            <ul>
                <li><b>STEM Programs:</b> Often require SPM credits in Math, Additional Math, Physics, Chemistry/Biology.</li>
                <li><b>Law/Medicine Degrees:</b> Usually require specific Pre-U programs (Foundation, STPM, A-Levels, IB) with high CGPA (e.g., 3.5+).</li>
                <li><b>Teaching:</b> May require SPM credit in Bahasa Malaysia + MUET (check specific program).</li>
            </ul>

            {/* Accreditation */}
            <h3>Accreditation</h3>
            <ul>
                <li><b>Local Recognition:</b> Look for MQA (Malaysian Qualifications Agency) or MOE (Ministry of Education) approval.</li>
                <li><b>Global Recognition:</b> Relevant for programs like IB, A-Levels (Cambridge), ADTP (U.S. Regional Boards).</li>
            </ul>

            {/* Institutions Overview */}
            <h3>Institutions Overview</h3>
            <ul>
                <li><b>Public (IPTA):</b> e.g., UM, UPM, UiTM. Often subsidized fees, competitive entry.</li>
                <li><b>Private (IPTS):</b> e.g., Taylor’s, Sunway, INTI, Monash Malaysia, AIMST. Wider range, variable fees.</li>
            </ul>

            {/* Cost Comparison Table */}
            <h3>Cost Comparison (General Estimates)</h3>
            <table>
                <thead><tr><th>Program Type</th><th>Public (RM)</th><th>Private (RM)</th></tr></thead>
                <tbody>
                    <tr><td>Foundation / Asasi / Matrikulasi</td><td>1,000 - 3,000</td><td>10,000 - 25,000</td></tr>
                    <tr><td>Diploma</td><td>5,000 - 10,000</td><td>15,000 - 30,000</td></tr>
                    <tr><td>A-Level / IB / AUSMAT / SAM</td><td>N/A (Govt Schools minimal for STPM)</td><td>15,000 - 40,000+</td></tr>
                    <tr><td>ADTP (Malaysia portion)</td><td>N/A</td><td>30,000 - 60,000</td></tr>
                </tbody>
            </table>
            <p><small><i>Note: Fees for specialized private colleges (e.g., KYUEM, KTJ for A-Levels/IB) can be significantly higher.</i></small></p>

            {/* Pathway to Degree */}
            <h3>Pathway to Degree</h3>
            <ul>
                <li><b>Direct Entry (Year 1):</b> Typically Foundation, Matrikulasi, A-Levels, IB, STPM.</li>
                <li><b>Advanced Standing / Bridging:</b> Diploma (often Year 2 entry), ADTP/SAM/AUSMAT (credit transfer).</li>
            </ul>

            {/* Career Alignment Examples */}
            <h3>Career Alignment Examples</h3>
            <ul>
                <li><b>Medicine:</b> Asasi/Matrikulasi (Science) → MBBS degree.</li>
                <li><b>Engineering:</b> STPM/Diploma/Foundation (Eng/Sci) → Bachelor’s degree.</li>
                <li><b>Law:</b> A-Levels/IB/Foundation (Arts/Law) → LLB degree.</li>
            </ul>

            {/* Final Tips */}
            <h3>Final Tips</h3>
            <ul>
                <li><b>Funding:</b> Explore scholarships (JPA, MARA, etc.) and PTPTN loans.</li>
                <li><b>Deadlines:</b> Apply early, especially for public programs (e.g., UPU around March/April).</li>
                <li><b>Recognition:</b> Always verify MQA accreditation for local degree pathways.</li>
            </ul>
        </Section>
        {/* ===================================================== */}


        {/* Back To Top Button */}
        {isVisible && (<BackToTopButton onClick={scrollToTop}><ArrowUpward /> Back To Top</BackToTopButton>)}
      </DetailsContainer>
    </>
  );
};

export default ProgramDetails;