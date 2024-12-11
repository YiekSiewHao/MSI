import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import scholarships from '../scholarships.json';

const ListContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    font-size: 24px; 
    margin-bottom: 20px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ScholarshipCard = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
    transform: translateY(-5px);
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 8px;

    @media (max-width: 480px) {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
  }

  .content {
    flex: 1;

    h3 {
      font-size: 20px;
      color: #007BFF;
      margin-bottom: 10px;

      @media (max-width: 480px) {
        font-size: 16px; 
        margin-bottom: 8px;
      }
    }

    p {
      font-size: 16px;
      color: #555;

      @media (max-width: 480px) {
        display: none; /* Hide description on mobile */
      }
    }
  }

  @media (max-width: 480px) {
    padding: 8px; /* Reduce padding on mobile */
  }
`;

const ScholarshipList = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (id) => {
    navigate(`/scholarship-detail/${id}`);
  };

  return (
    <ListContainer>
      <Title>Available Scholarships</Title>
      <GridContainer>
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} onClick={() => handleClick(scholarship.id)}>
            {scholarship.logoPlaceholder ? (
              <img src={scholarship.logoPlaceholder} alt={`${scholarship.shortName} Logo`} />
            ) : (
              <img src="/assets/company_logos/default_logo.png" alt="Default Logo" /> /* Placeholder image */
            )}
            <div className="content">
              <h3>{scholarship.shortName}</h3>
              {!isMobile && (
                <p>{scholarship.description.substring(0, 100)}...</p>
              )}
            </div>
          </ScholarshipCard>
        ))}
      </GridContainer>
    </ListContainer>
  );
};

export default ScholarshipList;
