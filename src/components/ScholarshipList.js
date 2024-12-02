import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import scholarships from '../scholarships.json';

const ListContainer = styled.div`
  padding: 20px; /* Reduced padding */
  max-width: 1400px; /* Increased max-width */
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px; /* Increased font size */
  color: #007BFF;
  text-align: center;
  margin-bottom: 30px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Adjusted for responsive columns */
  gap: 20px;
`;

const ScholarshipCard = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
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
  }

  .content {
    flex: 1;

    h3 {
      font-size: 20px;
      color: #007BFF;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #555;
    }
  }
`;

const ScholarshipList = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/scholarship-detail/${id}`);
  };

  return (
    <ListContainer>
      <Title>Available Scholarships</Title>
      <GridContainer>
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} onClick={() => handleClick(scholarship.id)}>
            {scholarship.logoPlaceholder && (
              <img src={scholarship.logoPlaceholder} alt={`${scholarship.shortName} Logo`} />
            )}
            <div className="content">
              <h3>{scholarship.shortName}</h3>
              <p>{scholarship.description.substring(0, 100)}...</p>
            </div>
          </ScholarshipCard>
        ))}
      </GridContainer>
    </ListContainer>
  );
};

export default ScholarshipList;
