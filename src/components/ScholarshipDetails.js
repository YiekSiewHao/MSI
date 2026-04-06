// src/components/ScholarshipDetails.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import scholarships from "../scholarships.json";
import { ArrowBack, ArrowUpward, ArrowForward } from "@mui/icons-material";
import { FaInstagram } from "react-icons/fa"; // Import Instagram icon

// Styled Components

const DetailsContainer = styled.div`
  padding: 40px 10px;
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const BackButton = styled.button`
  background-color: #017bffff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease;
  position: relative;
  left: -10px;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 14px;
    left: 0;
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease-in-out;
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    right: 50%;
    transform: translateX(50%);
    font-size: 14px;
    padding: 8px 15px;

    &:hover {
      background-color: #0056b3;
      transform: translateX(50%); /* Remove scaling on hover */
    }
  }
`;

const QuickListContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const QuickListItem = styled.button`
  font-family: "Poppins", sans-serif;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.active &&
    css`
      background-color: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    `}

  &:hover {
    background-color: #357ab8;
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 14px;
    font-size: 12px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #007bff;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 24px;
    color: #007bff;
    margin-bottom: 15px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;

    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 10px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  h3 {
    font-size: 20px;
    color: #0056b3;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  h4 {
    font-size: 18px;
    color: #007bff;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  p,
  ul,
  li {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    color: #555;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
`;

const ScholarStoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const ScholarStoryCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  padding-right: 30px;
  padding-left: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
    transform: translateY(-5px);
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 50%;
    border: 2px solid #007bff;

    @media (max-width: 480px) {
      width: 60px;
      height: 60px;
    }
  }

  .content {
    flex: 1;
    margin-right: 10px;

    h4 {
      font-size: 18px;
      margin-bottom: 4px; /* Reduced margin-bottom */

      @media (max-width: 768px) {
        font-size: 16px;
      }

      @media (max-width: 480px) {
        font-size: 14px;
      }
    }

    p {
      font-size: 16px;
      margin-top: 4px;
      margin-bottom: 4px; /* Reduced margin-bottom */

      @media (max-width: 768px) {
        font-size: 14px;
      }

      @media (max-width: 480px) {
        font-size: 13px;
      }
    }

    a.instagram-link {
      display: flex;
      align-items: center;
      color: #e1306c; /* Updated color */
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease, transform 0.3s ease; /* Added transition for smooth hover effect */

      &:hover {
        color: #d81b60; /* Slightly darker shade on hover */
        transform: translateY(-2px); /* Slight upward movement on hover */
      }

      svg {
        margin-right: 8px; /* Increased spacing from 5px to 8px */
        font-size: 20px;

        @media (max-width: 480px) {
          font-size: 18px;
        }
      }
    }

    span {
      font-size: 14px;
      color: #888;
      margin-top: 4px; /* Optional: slight top margin for spacing */

      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
  }

  .arrow-icon {
    color: #007bff;
    font-size: 24px;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px; /* Reduced padding for mobile */
  }
`;

// ScholarshipDetails Component

const ScholarshipDetails = ({ setScrollPosition }) => {
  const navigate = useNavigate();
  const { id, scholarSlug } = useParams(); // Make sure it is scholarSlug, not scholarName
  const [isVisible, setIsVisible] = useState(false);

  // 1. Find the scholarship data
  const scholarship = scholarships.find((s) => s.id === id);

  // 2. All Hooks must be at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 3. Navigation and Scroll Handlers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    navigate("/", { state: { scrollTo: "scholarshipList" } });
  };

  const handleQuickListClick = (scholarshipId) => {
    navigate(`/scholarship-detail/${scholarshipId}`);
  };

  const handleStoryClick = (scholar) => {
    if (!scholar?.contributorName) return;
    const scholarSlug = scholar.contributorName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/scholarship-detail/${id}/scholarstories/${scholarSlug}`);
  };

  // 4. THE SAFETY GUARD
  if (!scholarship) {
    return (
      <DetailsContainer>
        <BackButton onClick={handleBackToHome}>
          <ArrowBack /> Back to Home
        </BackButton>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Scholarship not found.</h2>
          <p>We couldn't find a scholarship with the ID: {id}</p>
        </div>
      </DetailsContainer>
    );
  }

  // 5. Destructure safely 
  const {
    name,
    description,
    eligibilityCriteria,
    requiredDocuments,
    fullBreakdownofCoverage,
    coursesOffered,
    bondingDetails,
    applicationTimeline,
    applicationLink,
    numberOfRecipients,
    ResultNotification,
    applicationProcess,
    contactEmail,
    contactNumber,
    scholars,
    FAQs,
  } = scholarship;

  return (
    <>
      <DetailsContainer>
        <BackButton onClick={handleBackToHome}>
          <ArrowBack />
        </BackButton>

        <QuickListContainer>
          {scholarships.map((item) => (
            <QuickListItem
              key={item.id}
              active={item.id === id}
              onClick={() => handleQuickListClick(item.id)}
            >
              {item.shortName}
            </QuickListItem>
          ))}
        </QuickListContainer>

        <Title>{name}</Title>

        <Section>
          <h2>Description</h2>
          <p>{description}</p>
        </Section>

        {/* Scholars' Stories */}
        {scholars?.length > 0 && (
          <Section>
            <h2>Scholars' Stories</h2>
            <ScholarStoriesGrid>
              {scholars.filter(s => s.contributorName).map((scholar, index) => (
                <ScholarStoryCard key={index} onClick={() => handleStoryClick(scholar)}>
                  <img src={scholar.contributorImage || "/default-avatar.png"} alt={scholar.contributorName} />
                  <div className="content">
                    <h4>{scholar.contributorName}</h4>
                    {scholar.contactInformation && (
                      <div className="instagram-link"><FaInstagram style={{marginRight: '5px'}}/> {scholar.contactInformation}</div>
                    )}
                    <p><strong>{scholar.intendedCourse}</strong></p>
                    <span>{scholar.currentInstitution}</span>
                  </div>
                  <ArrowForward className="arrow-icon" />
                </ScholarStoryCard>
              ))}
            </ScholarStoriesGrid>
          </Section>
        )}

        <Section>
          <h2>Application Timeline</h2>
          <p><strong>Start Date:</strong> {applicationTimeline?.startDate}</p>
          <p><strong>End Date:</strong> {applicationTimeline?.endDate}</p>
          {applicationTimeline?.note && <p><i>*{applicationTimeline.note}</i></p>}
        </Section>

        <Section>
          <h2>Eligibility Criteria</h2>

          {/* 1. Main Criteria */}
          <h3>Main Criteria</h3>
          <ul>
            {(eligibilityCriteria.mainCriteria || []).map((item, index) => {
              if (typeof item === 'object' && item !== null) {
                return (
                  <li key={index} style={{ listStyle: 'none', marginBottom: '15px', marginLeft: '-20px' }}>
                    <strong>{item.title}</strong>
                    <ul>
                      {(item.detail || []).map((subItem, subIndex) => (
                        <li key={subIndex}>{subItem}</li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return <li key={index}>{item}</li>;
            })}
          </ul>

          {/* 2. Academic Qualifications (Single Block) */}
          {eligibilityCriteria?.academicQualifications && (
            <div style={{ marginTop: '20px' }}>
              <h3>Academic Qualifications</h3>
              
              {eligibilityCriteria.displayType === 'table' ? (
                <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6', marginTop: '10px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Field of Study</th>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Requirements</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eligibilityCriteria.academicQualifications.map((item, index) => {
                        const isHeader = typeof item === 'string';
                        return (
                          <tr key={index} style={isHeader ? { backgroundColor: '#f0f7ff' } : {}}>
                            {isHeader ? (
                              <td colSpan="2" style={{ padding: '12px', border: '1px solid #dee2e6', color: '#0056b3' }}>
                                {item}
                              </td>
                            ) : (
                              <>
                                <td style={{ padding: '12px', border: '1px solid #dee2e6', verticalAlign: 'top' }}>
                                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
                                    {typeof item.field === 'string' 
                                      ? item.field.split(',').map((f, i) => f.trim() && <li key={i}>{f.trim()}</li>)
                                      : (item.field || []).map((f, i) => <li key={i}>{f}</li>)}
                                  </ul>
                                </td>
                                <td style={{ padding: '12px', border: '1px solid #dee2e6', verticalAlign: 'top' }}>
                                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    {(item.criteria || []).map((sub, i) => <li key={i}>{sub}</li>)}
                                  </ul>
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ marginTop: '10px' }}>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {(eligibilityCriteria.academicQualifications || []).map((point, i) => (
                      <li key={i} style={{ marginBottom: '8px', lineHeight: '1.5', color: '#333' }}>
                        {typeof point === 'string' ? (
                          /* Removed the length check/bolding here */
                          point
                        ) : (
                          <span>
                            {point.field}: {Array.isArray(point.criteria) ? point.criteria.join(', ') : point.criteria}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {/* 3. Additional Criteria */}
          {eligibilityCriteria?.additionalCriteria && (
            <div style={{ marginTop: '20px' }}>
              <h3>Additional Criteria</h3>
              <ul>
                {eligibilityCriteria.additionalCriteria.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* Only render the entire section if requiredDocuments has data */}
        {requiredDocuments && requiredDocuments.length > 0 && (
          <Section>
            <h2>Required Documents</h2>
            <ul>
              {requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section>
         <h2>Full Breakdown of Coverage</h2>
          <ul>
            {(fullBreakdownofCoverage || []).map((item, index) => {
              if (typeof item === 'object' && item !== null) {
                return (
                  <li key={index} style={{ listStyle: 'none', marginBottom: '15px', marginLeft: '-20px' }}>
                    <strong>{item.title}</strong>
                    <ul style={{ marginTop: '5px' }}>
                      {(item.details || []).map((detail, dIndex) => (
                        <li key={dIndex}>{detail}</li>
                      ))}
                    </ul>
                  </li>
                );
             }
              return <li key={index} style={{ marginBottom: '8px' }}>{item}</li>;
            })}
          </ul>
        </Section>

        <Section>
          <h2>Courses Offered</h2>
          {Array.isArray(coursesOffered) ? (
            <ul>
              {coursesOffered.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          ) : (
            coursesOffered && Object.entries(coursesOffered).map(([category, list], index) => (
              <div key={index}>
                <h4>{category}</h4>
                <ul>
                  {Array.isArray(list) ? (
                    list.map((course, i) => <li key={i}>{course}</li>)
                ) : (
                  <li>{list}</li>
                )}
              </ul>
            </div>
          ))
        )}
      </Section>

      <Section>
        <h2>Application Process</h2>
        {(applicationProcess || []).map((step, index) => (
          <div key={index} style={{marginBottom: '20px'}}>
           <h3>{step.stage}</h3>
           <p>{step.details}</p>
            {step.tips && (
              <ul>
                {(step.tips || []).map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {ResultNotification && (
        <Section>
          <h2>Result Notification</h2>
          <ul>
            {(ResultNotification || []).map((note, i) => <li key={i}>{note}</li>)}
         </ul>
        </Section>
      )}

       {bondingDetails && (
          <Section>
            <h2>Bonding Details</h2>
            <ul>
              {/* 1. Duration */}
              {bondingDetails?.duration && (
                <li style={{ listStyle: 'none', marginBottom: '10px', marginLeft: '-20px' }}>
                  <strong>Duration:</strong>
                  <ul style={{ marginTop: '5px' }}>
                    <li>{bondingDetails.duration}</li>
                  </ul>
                </li>
              )}

              {/* 2. Work Location */}
              {bondingDetails?.workLocation && (
                <li style={{ listStyle: 'none', marginBottom: '10px', marginLeft: '-20px' }}>
                  <strong>Work Location:</strong>
                  <ul style={{ marginTop: '5px' }}>
                    <li>{bondingDetails.workLocation}</li>
                  </ul>
                </li>
              )}

              {/* 3. Repayment Conditions */}
              {bondingDetails?.repaymentConditions && (
                <li style={{ listStyle: 'none', marginBottom: '10px', marginLeft: '-20px' }}>
                  <strong>Repayment Conditions:</strong>
                  <ul style={{ marginTop: '5px' }}>
                    {Array.isArray(bondingDetails.repaymentConditions) ? (
                      bondingDetails.repaymentConditions.map((condition, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{condition}</li>
                      ))
                    ) : (
                      <li>{bondingDetails.repaymentConditions}</li>
                    )}
                  </ul>
                </li>
              )}
            </ul>
          </Section>
        )}

        {numberOfRecipients && (
          <Section>
            <h2>Number of Recipients</h2>
            <ul>
              {/* CASE 1: Simple Array */}
              {Array.isArray(numberOfRecipients) ? (
                numberOfRecipients.map((text, index) => (
                 <li key={index}>{text}</li>
               ))
             ) : (
                /* CASE 2: Object */
                Object.entries(numberOfRecipients).map(([key, value]) => {
                  // 1. Define how we want the "technical" keys to look
                 const labelMapping = {
                   YearofInvestigation: "Year of Investigation",
                    local: "Local Recipients",
                    overseas: "Overseas Recipients",
                   total: "Total",
                    note: "Note"
                 };

                  // 2. Determine the label: Use the mapping if it exists, 
                 // otherwise just use the key (like "2023")
                 const displayLabel = labelMapping[key] || key;

                  // 3. Render the list item
                  return (
                   <li key={key} style={{ marginBottom: '8px' }}>
                     <strong>{displayLabel}:</strong> {key === 'note' ? <i>{value}</i> : value}
                   </li>
                 );
               })
             )}
           </ul>
         </Section>
        )}

        <Section>
          <h2>Contact Info</h2>
  
          {/* Only show Email if it exists */}
          {contactEmail && (
            <p>Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          )}

          {/* Only show Phone if contactNumber is NOT null/empty */}
          {contactNumber && (
            <p>Phone: {contactNumber}</p>
          )}

          {applicationLink && (
            <p>
              <a href={applicationLink} target="_blank" rel="noreferrer">
                Apply via Official Website
              </a>
            </p>
         )}
        </Section>

        {FAQs && (
        <Section>
          <h2>Frequently Asked Questions (FAQs)</h2>
          {(FAQs || []).map((faq, index) => {
            const [question, answer] = Object.values(faq);
            return (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#333', fontSize: '18px' }}>Q: {question}</h3>
                <p style={{ marginLeft: '10px', borderLeft: '3px solid #007bff', paddingLeft: '15px' }}>
                  {answer}
                </p>
              </div>
            );
          })}
        </Section>
      )}

        {isVisible && (
          <BackToTopButton onClick={scrollToTop}>
            <ArrowUpward /> Back To Top
          </BackToTopButton>
        )}
      </DetailsContainer>
    </>
  );
};

// Helper function to validate URLs
const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export default ScholarshipDetails;
