// src/components/ScholarshipList.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';
import scholarships from '../scholarships.json';

/* Styled Components */

/* Container for the entire list */
const ListContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

/* Title of the list */
const Title = styled.h1`
  font-size: 32px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 28px; 
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 24px; 
    margin-bottom: 20px;
  }
`;

/* Container for filter buttons */
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
  padding: 10px 0;

  /* Flex-wrap behavior based on screen size */
  @media (min-width: 769px) {
    flex-wrap: nowrap; /* Prevent wrapping on laptop and larger screens */
  }

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Allow wrapping on tablet and smaller screens */
    justify-content: center;
  }

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* IE and Edge */
  -ms-overflow-style: none;  

  /* Firefox */
  scrollbar-width: none; 
`;

/* Styled Filter Button */
const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.active ? '#007BFF' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#ffffff' : '#333')};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  box-shadow: ${(props) => (props.active ? '0 4px 12px rgba(0, 123, 255, 0.4)' : 'none')};
  white-space: nowrap; /* Prevent text from wrapping */

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e0e0e0')};
    /* Removed transform to prevent overlapping */
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 8px 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 16px;
    gap: 6px; /* Reduced gap between icon and text */
  }
`;

/* Grid layout for scholarship cards */
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
`;

/* Individual Scholarship Card */
const ScholarshipCard = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
    transform: translateY(-5px); /* Slight lift on hover */
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
      margin-right: 12px;
    }

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

      @media (max-width: 768px) {
        font-size: 18px; 
        margin-bottom: 8px;
      }

      @media (max-width: 480px) {
        font-size: 16px; 
        margin-bottom: 6px;
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
    padding: 10px; /* Reduce padding on mobile */
  }
`;

const ScholarshipList = () => {
  const navigate = useNavigate();

  /* State to manage filter selection */
  const [filter, setFilter] = useState('All');

  /* State to manage mobile view */
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  /* Update mobile state on window resize */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Handle navigation to scholarship detail */
  const handleClick = (id) => {
    navigate(`/scholarship-detail/${id}`);
  };

  /* Optional: Persist filter state using sessionStorage */
  useEffect(() => {
    const savedFilter = sessionStorage.getItem('scholarshipFilter');
    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('scholarshipFilter', filter);
  }, [filter]);

  /* Filter scholarships based on selected filter */
  const filteredScholarships = filter === 'All' 
    ? scholarships 
    : scholarships.filter(scholarship => scholarship.scholarshipLevel.toLowerCase() === filter.toLowerCase());

  return (
    <ListContainer>
      <Title>Available Scholarships</Title>

      {/* Filter Buttons */}
      <FilterContainer>
        {/* Optional: Rearrange buttons to center "All" */}
        <FilterButton 
          active={filter === 'All'} 
          onClick={() => setFilter('All')}
        >
          <FaFilter />
          All
        </FilterButton>
        <FilterButton 
          active={filter === 'Global'} 
          onClick={() => setFilter('Global')}
        >
          <FaFilter />
          Global
        </FilterButton>
        <FilterButton 
          active={filter === 'Local'} 
          onClick={() => setFilter('Local')}
        >
          <FaFilter />
          Local
        </FilterButton>
        {/* Add more filter buttons if needed */}
      </FilterContainer>

      <GridContainer>
        {filteredScholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} onClick={() => handleClick(scholarship.id)}>
            {scholarship.logoPlaceholder ? (
              <img src={scholarship.logoPlaceholder} alt={`${scholarship.shortName} Logo`} loading="lazy" />
            ) : (
              <img src="/assets/company_logos/default_logo.png" alt="Default Logo" loading="lazy" /> /* Placeholder image */
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
