// src/components/Shortcut.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaFileAlt, FaChartBar, FaEnvelope, FaClipboardList } from 'react-icons/fa'; // Added new icon for Interview Card

// Global Font Import
import { createGlobalStyle } from 'styled-components';

// Global Styles to include Google Fonts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

/* Styled Components */

const ShortcutContainer = styled.div`
  padding: 60px 20px;
  max-width: 1500px;
  margin: 0 auto;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0; 

  @media (max-width: 768px) {
    padding: 40px 15px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
  
  &.show {
    animation: fadeInUp 1s ease-out forwards;
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

// Heading for the Shortcut component
const Heading = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

// Description under the Heading
const HeadingDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-weight: 400;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Container for the four cards
const CardsContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 100%;
  animation: fadeInUp 1s ease-out;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

// Individual Card styled as a Link
const Card = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  width: 30%;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
    background-color: #f0f8ff;
  }

  @media (max-width: 992px) {
    width: 80%;
    padding: 30px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 30px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 20px;
  }
`;

// CardIcon is used for the icons
const CardIcon = styled.div`
  font-size: 40px;
  color: #007bff;
  margin-right: 20px;

  @media (max-width: 480px) {
    font-size: 35px;
    margin-right: 15px;
  }
`;

// Title inside the Card
const CardTitle = styled.h3`
  font-size: 20px;
  color: #007bff;
  margin-bottom: 5px;
  margin-top: 0px;
  font-weight: 600;
  text-align:left;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

// Description inside the Card
const CardDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
  font-weight: 400;
  text-align:left;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Shortcut = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const handleSampleEssaysClick = () => {
    navigate('/preparation#sample-essays');
  };

  const handleCaseStudyClick = () => {
    navigate('/preparation/koh_hui_xin_resource_pack?tab=caseStudy');
  };

  const handleAppealLetterClick = () => {
    navigate('/preparation/koh_hui_xin_resource_pack?tab=appealLetter');
  };

  const handleInterviewQuestionsClick = () => {
    navigate('/preparation#interview-questions-answers');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(document.querySelector('#shortcut-section'));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalStyle />
      <ShortcutContainer id="shortcut-section" className={isVisible ? 'show' : ''}>
        <Heading>Resource Pack</Heading>
        <HeadingDescription>
          The MSI Resource Pack provides essential materials to help you prepare for scholarship applications, including essays, case studies, and appeal letters.
        </HeadingDescription>
        <CardsContainer>
          {/* Sample Essays Card */}
          <Card onClick={handleSampleEssaysClick}>
            <CardIcon>
              <FaFileAlt />
            </CardIcon>
            <div>
              <CardTitle>Sample Essays</CardTitle>
              <CardDescription>Explore a collection of exemplary essays to inspire your own.</CardDescription>
            </div>
          </Card>

          {/* Case Study Card */}
          <Card onClick={handleCaseStudyClick}>
            <CardIcon>
              <FaChartBar />
            </CardIcon>
            <div>
              <CardTitle>Case Study</CardTitle>
              <CardDescription>Access detailed case studies to enhance your analytical skills.</CardDescription>
            </div>
          </Card>

          {/* Appeal Letter Card */}
          <Card onClick={handleAppealLetterClick}>
            <CardIcon>
              <FaEnvelope />
            </CardIcon>
            <div>
              <CardTitle>Appeal Letter</CardTitle>
              <CardDescription>Learn how to craft compelling appeal letters for scholarship applications.</CardDescription>
            </div>
          </Card>

          {/* Interview Questions Card */}
          <Card onClick={handleInterviewQuestionsClick}>
            <CardIcon>
              <FaClipboardList />
            </CardIcon>
            <div>
              <CardTitle>Interview Questions</CardTitle>
              <CardDescription>Prepare for your interviews with helpful questions and answers.</CardDescription>
            </div>
          </Card>
        </CardsContainer>
      </ShortcutContainer>
    </>
  );
};

export default Shortcut;
