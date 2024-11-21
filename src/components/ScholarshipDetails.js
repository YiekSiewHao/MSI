import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import scholarships from '../scholarships.json';
import { ArrowBack, ArrowUpward } from '@mui/icons-material';

const DetailsContainer = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background-color: #007BFF;
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

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007BFF;
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
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  svg {
    font-size: 20px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 24px;
    color: #007BFF;
    margin-bottom: 15px;
    border-bottom: 2px solid #007BFF;
    padding-bottom: 5px;
  }

  h3 {
    font-size: 20px;
    color: #0056b3;
    margin-bottom: 10px;
  }

  p,
  ul {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
`;

const ScholarStoryCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
    transform: translateY(-5px);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 50%;
    border: 2px solid #007BFF;
  }

  .content {
    h4 {
      font-size: 22px;
      color: #007BFF;
      margin-bottom: 8px;
    }

    p {
      font-size: 18px;
      color: #555;
      margin-bottom: 5px;
    }

    span {
      font-size: 16px;
      color: #888;
    }
  }
`;

const ScholarshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const scholarship = scholarships.find((s) => s.id === id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleStoryClick = (scholar) => {
    if (!scholar?.contributorName) {
      console.error("Scholar's name is undefined:", scholar);
      return;
    }

    const scholarSlug = scholar.contributorName.toLowerCase().replace(/\s+/g, '-');
    window.scrollTo(0, 0);
    navigate(`/scholarship-detail/${id}/scholarstories/${scholarSlug}`);
  };

  if (!scholarship) {
    return (
      <DetailsContainer>
        <p>Scholarship not found.</p>
      </DetailsContainer>
    );
  }

  const {
    name,
    description,
    eligibilityCriteria,
    requiredDocuments,
    coursesOffered,
    bondingDetails,
    applicationTimeline,
    numberOfRecipients,
    applicationLink,
    resultNotification,
    applicationProcess,
    contactEmail,
    scholars,
  } = scholarship;

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </BackButton>

      <Title>{name}</Title>

      <Section>
        <h2>Description</h2>
        <p>{description}</p>
      </Section>

      {scholars && scholars.length > 0 && (
        <Section>
          <h2>Scholars' Stories</h2>
          {scholars.map((scholar, index) => (
            <ScholarStoryCard key={index} onClick={() => handleStoryClick(scholar)}>
              <img src={scholar.contributorImage || '/default-avatar.png'} alt={scholar.contributorName} />
              <div className="content">
                <h4>{scholar.contributorName}</h4>
                <p>{scholar.intendedCourse}</p>
                {scholar.motivationalQuote && <span>"{scholar.motivationalQuote}"</span>}
              </div>
            </ScholarStoryCard>
          ))}
        </Section>
      )}

      <Section>
        <h2>Eligibility Criteria</h2>
        <h3>Main Criteria</h3>
        <ul>
          {eligibilityCriteria.mainCriteria.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {eligibilityCriteria.academicQualifications && (
          <>
            <h3>Academic Qualifications</h3>
            {Array.isArray(eligibilityCriteria.academicQualifications) &&
            typeof eligibilityCriteria.academicQualifications[0] === 'object' ? (
              eligibilityCriteria.academicQualifications.map((qual, index) => (
                <div key={index}>
                  <h4>{qual.field}</h4>
                  <ul>
                    {qual.criteria.map((item, subIndex) => (
                      <li key={subIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul>
                {eligibilityCriteria.academicQualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </Section>

      <Section>
        <h2>Required Documents</h2>
        <ul>
          {requiredDocuments.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
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
          coursesOffered &&
          Object.entries(coursesOffered).map(([category, courses], index) => (
            <div key={index}>
              <h4>{category}</h4>
              <ul>
                {courses.map((course, subIndex) => (
                  <li key={subIndex}>{course}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </Section>

      <Section>
        <h2>Bonding Details</h2>
        <p>
          <strong>Duration:</strong> {bondingDetails?.duration || 'Not specified'}
        </p>
        <p>
          <strong>Work Location:</strong> {bondingDetails?.workLocation || 'Not specified'}
        </p>
        {bondingDetails?.repaymentConditions && (
          <>
            <h3>Repayment Conditions</h3>
            <ul>
              {bondingDetails.repaymentConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </>
        )}
      </Section>

      <Section>
        <h2>Application Timeline</h2>
        <p>
          <strong>Start Date:</strong> {applicationTimeline.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {applicationTimeline.endDate}
        </p>
      </Section>

      <Section>
  {/* Check if `numberOfRecipients` contains valid data */}
  {numberOfRecipients && (
    numberOfRecipients.local || numberOfRecipients.overseas || numberOfRecipients['2024'] || numberOfRecipients['2023']
  ) ? (
    <>
      <h2>Number of Recipients</h2>
      {numberOfRecipients.local ? (
        <>
          <p>
            <strong>Local:</strong> {numberOfRecipients.local}
          </p>
          <p>
            <strong>Overseas:</strong> {numberOfRecipients.overseas}
          </p>
        </>
      ) : (
        <>
          {numberOfRecipients['2024'] && (
            <p>
              <strong>2024:</strong> {numberOfRecipients['2024']}
            </p>
          )}
          {numberOfRecipients['2023'] && (
            <p>
              <strong>2023:</strong> {numberOfRecipients['2023']}
            </p>
          )}
        </>
      )}
    </>
  ) : null}
</Section>

      <Section>
        <h2>Application Link</h2>
        <p>
          <a href={applicationLink} target="_blank" rel="noopener noreferrer">
            {applicationLink}
          </a>
        </p>
      </Section>

      <Section>
        <h2>Result Notification</h2>
        <ul>
          {resultNotification.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2>Application Process</h2>
        <ul>
          {applicationProcess.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2>Contact Email</h2>
        <p>{contactEmail}</p>
      </Section>

      {isVisible && (
        <BackToTopButton onClick={scrollToTop}>
          <ArrowUpward /> Back To Top
        </BackToTopButton>
      )}
    </DetailsContainer>
  );
};

export default ScholarshipDetails;
