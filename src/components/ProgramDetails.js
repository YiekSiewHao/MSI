// src/components/ProgramDetails.js

import React, { useEffect, useState, useMemo } from 'react'; // Added useMemo
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components'; // Added css import
import programsData from '../programs.json';
import { ArrowBack, ArrowUpward } from '@mui/icons-material';

// --- Styled Components ---
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
const BackToTopButton = styled.button`
  position: fixed; bottom: 20px; right: 40px; background-color: #007BFF; color: white;
  border: none; padding: 10px 20px; border-radius: 12px; cursor: pointer; display: flex;
  align-items: center; gap: 8px; font-size: 16px; font-weight: bold; z-index: 1000;
  transition: background-color 0.3s ease, transform 0.3s ease-in-out;
  &:hover { background-color: #0056b3; transform: scale(1.05); }
  svg { font-size: 20px; }
  @media (max-width: 480px) { right: 50%; transform: translateX(50%); font-size: 14px; padding: 8px 15px; &:hover { transform: translateX(50%); } }
`;

// Top Banner Image Style
const HeaderImage = styled.img`
  display: block; width: 100%; max-width: 700px; height: auto;
  margin: 0 auto 30px auto; border-radius: 10px; object-fit: cover;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  font-size: 32px; color: #007BFF; text-align: center; margin-bottom: 30px;
  @media (max-width: 768px) { font-size: 26px; margin-bottom: 20px; }
`;
const Section = styled.div`
  margin-bottom: 30px;
  h2 { font-size: 24px; color: #007BFF; margin-bottom: 15px; border-bottom: 2px solid #007BFF; padding-bottom: 5px; }
  h3 { font-size: 20px; color: #0056b3; margin-top: 20px; margin-bottom: 10px; }
  h4 { font-size: 18px; color: #0056b3; margin-top: 15px; margin-bottom: 8px; }
  p, ul, li { font-size: 16px; color: #555; line-height: 1.6; }
  ul { list-style-type: disc; padding-left: 20px; margin-top: 5px; li { margin-bottom: 8px; } }
  div > ul { padding-left: 25px; margin-top: 5px; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 15px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; color: #333; font-weight: bold; }
  tr:nth-child(even) { background-color: #f9f9f9; }
`;

// --- Copied from ScholarshipDetails ---
const QuickListContainer = styled.div`
  margin-bottom: 40px; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;
  @media (max-width: 768px) { gap: 12px; }
  @media (max-width: 480px) { gap: 10px; }
`;

const QuickListItem = styled.button`
  font-family: 'Poppins', sans-serif; background-color: #4a90e2; color: white;
  border: none; padding: 8px 16px; /* Adjusted padding slightly */
  border-radius: 20px; font-size: 13px; /* Adjusted font size slightly */
  cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  white-space: nowrap; /* Prevent long names from breaking */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for very long names */
  max-width: 250px; /* Limit button width */


  ${(props) =>
    props.active &&
    css`
      background-color: #0056b3; transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    `}

  &:hover {
    background-color: #357ab8; transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) { padding: 7px 14px; font-size: 12px; max-width: 200px; }
  @media (max-width: 480px) { padding: 6px 12px; font-size: 11px; max-width: 150px; }
`;
// --- End Styled Components ---


const ProgramDetails = () => {
  const navigate = useNavigate();
  const { programName } = useParams(); // Decoded name of the current program
  const [program, setProgram] = useState(null); // State for the current program's details
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // --- Prepare list of ALL programs ---
  const allPrograms = useMemo(() => {
    let flatList = [];
    for (const type in programsData.programType) {
      if (programsData.programType.hasOwnProperty(type) && Array.isArray(programsData.programType[type])) {
        // Add program type info if needed later, otherwise just concat
        flatList = flatList.concat(programsData.programType[type]);
      }
    }
    // Add a simple shortName if it doesn't exist, defaulting to programName
    // You might want to actually add shortName to your JSON for better display
     return flatList.map(p => ({
         ...p,
         shortName: p.shortName || p.programName // Use existing or default to full name
     }));
  }, []); // Empty dependency array - calculates only once

  // --- Effects ---
  useEffect(() => { // Find current program details
    setLoading(true);
    // Find logic is simplified as we just need the details for the current 'programName'
    const found = allPrograms.find(p => p.programName === programName);
    setProgram(found);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [programName, allPrograms]); // Depend on programName and the calculated allPrograms list

  useEffect(() => { // Back to top visibility
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // --- Helper Functions ---
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleBackToHome = () => navigate('/', { state: { scrollTo: 'programList' } });

  // Handler for Quick List button clicks
  const handleQuickListClick = (targetProgramName) => {
    if (!targetProgramName) return;
    // Need to encode the name for the URL
    const encodedName = encodeURIComponent(targetProgramName);
    window.scrollTo(0, 0); // Scroll to top before navigating
    navigate(`/program-detail/${encodedName}`);
  };

  // Renders subjects (handles array/object)
  const renderSubjects = (subjectsData) => { /* ... implementation ... */ };
  // Renders static key considerations
  const renderStaticKeyConsiderations = () => { /* ... implementation ... */ };
  // --- End Helper Functions ---


  // --- Render Logic ---
  if (loading) { return <DetailsContainer>Loading program details...</DetailsContainer>; }
  // Note: Even if program is not found, we might still want to show the QuickList
  // Let's adjust the "Not Found" slightly

  // Get the display name for the title (even if program details weren't fully matched)
  const currentProgramTitle = program ? program.programName : programName; // Fallback to URL param


  return (
    <>
      <DetailsContainer>
        <BackButton onClick={handleBackToHome}><ArrowBack /> </BackButton>

        {/* --- Quick List Buttons --- */}
        <QuickListContainer>
          {allPrograms.map((progItem) => (
            <QuickListItem
              key={progItem.programName} // Use programName as key assuming it's unique
              active={progItem.programName === programName} // Compare with decoded name from URL
              onClick={() => handleQuickListClick(progItem.programName)} // Pass original name to handler
            >
              {progItem.shortName} {/* Display shortName (defaults to programName) */}
            </QuickListItem>
          ))}
        </QuickListContainer>
        {/* --- End Quick List --- */}


        {/* Conditionally render the rest if the program was found */}
        {!program ? (
            <>
                <Title>Program Not Found</Title>
                <p>Could not find details for a program named "{programName}". Please select from the list above or go back.</p>
            </>
        ) : (
            <>
                {/* === PROGRAM TITLE === */}
                <Title>{currentProgramTitle}</Title>
                {/* ===================== */}

                {/* === PROGRAM-SPECIFIC DETAILS (from JSON) === */}
                {program.description && (<Section><h2>Description</h2><p>{program.description}</p></Section>)}
                {typeof program.entryRequirements === 'string' && program.entryRequirements.trim() !== '' && (
                  <Section><h2>Entry Requirements</h2><p>{program.entryRequirements}</p></Section>
                )}
                <Section><h2>Subjects</h2>{renderSubjects(program.subjects)}</Section>
                {program.duration && program.duration !== "N/A" && (<Section><h2>Duration</h2><p>{program.duration}</p></Section>)}
                {program.pathway && program.pathway !== "N/A" && (<Section><h2>Program Pathway Note</h2><p>{program.pathway}</p></Section>)}
                {program.accreditation && program.accreditation !== "N/A" && (<Section><h2>Program Accreditation</h2><p>{program.accreditation}</p></Section>)}
                {program.institutions && program.institutions.length > 0 && (
                  <Section><h2>Institutions Offering This Program</h2><ul>{program.institutions.map((inst, idx) => <li key={`inst-${idx}`}>{inst}</li>)}</ul></Section>
                )}
                {program.cost && program.cost !== "N/A" && (<Section><h2>Estimated Cost (Program Specific)</h2><p>{program.cost}</p></Section>)}
                {/* ============================================= */}

                {/* === STATIC KEY CONSIDERATIONS SECTION === */}
                <Section>
                    <h2>Key Considerations & General Info</h2>
                    {renderStaticKeyConsiderations()}
                </Section>
                {/* ======================================= */}
            </>
        )}


        {/* Back To Top Button */}
        {isVisible && (<BackToTopButton onClick={scrollToTop}><ArrowUpward /> Back To Top</BackToTopButton>)}
      </DetailsContainer>
    </>
  );
};

// Make sure to include the renderStaticKeyConsiderations function implementation here
const renderStaticKeyConsiderations = () => (
    <>
      {/* Entry Requirements Notes */}
      <h3>Entry Requirements Notes</h3>
      <ul>
          <li><b>STEM Programs:</b> Often require SPM credits in Math, Additional Math, Physics, Chemistry/Biology.</li>
          <li><b>Law/Medicine Degrees:</b> Usually require specific Pre-U programs (Foundation, STPM, A-Levels, IB) with high CGPA (e.g., 3.5+).</li>
          <li><b>Teaching:</b> May require SPM credit in Bahasa Malaysia + MUET (check specific program).</li>
      </ul>
      {/* ... include all other static consideration points ... */}
       <h3>Accreditation</h3>
       <ul>
           <li><b>Local Recognition:</b> Look for MQA (Malaysian Qualifications Agency) or MOE (Ministry of Education) approval.</li>
           <li><b>Global Recognition:</b> Relevant for programs like IB, A-Levels (Cambridge), ADTP (U.S. Regional Boards).</li>
       </ul>
       <h3>Institutions Overview</h3>
       <ul>
           <li><b>Public (IPTA):</b> e.g., UM, UPM, UiTM. Often subsidized fees, competitive entry.</li>
           <li><b>Private (IPTS):</b> e.g., Taylor’s, Sunway, INTI, Monash Malaysia, AIMST. Wider range, variable fees.</li>
       </ul>
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
       <h3>Pathway to Degree</h3>
       <ul>
           <li><b>Direct Entry (Year 1):</b> Typically Foundation, Matrikulasi, A-Levels, IB, STPM.</li>
           <li><b>Advanced Standing / Bridging:</b> Diploma (often Year 2 entry), ADTP/SAM/AUSMAT (credit transfer).</li>
       </ul>
       <h3>Career Alignment Examples</h3>
       <ul>
           <li><b>Medicine:</b> Asasi/Matrikulasi (Science) → MBBS degree.</li>
           <li><b>Engineering:</b> STPM/Diploma/Foundation (Eng/Sci) → Bachelor’s degree.</li>
           <li><b>Law:</b> A-Levels/IB/Foundation (Arts/Law) → LLB degree.</li>
       </ul>
       <h3>Final Tips</h3>
       <ul>
           <li><b>Funding:</b> Explore scholarships (JPA, MARA, etc.) and PTPTN loans.</li>
           <li><b>Deadlines:</b> Apply early, especially for public programs (e.g., UPU around March/April).</li>
           <li><b>Recognition:</b> Always verify MQA accreditation for local degree pathways.</li>
       </ul>
    </>
  );


export default ProgramDetails;