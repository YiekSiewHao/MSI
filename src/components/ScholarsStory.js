// src/components/ScholarsStory.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import scholarships from '../scholarships.json';
import { ArrowBack } from '@mui/icons-material';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon

// Styled Components

const StoryContainer = styled.div`
  padding: 40px 5%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
`;

const FullWidthSection = styled.div`
  width: 100%;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 15%;
  position: relative;
  flex-direction: row; /* Default row for large screens */

      a.instagram-link {
      display: flex;
      align-items: center;
      color: #E1306C; /* Updated color */
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

  img {
    flex: 1.7;
    width: 100%;
    max-height: 400px; /* Reduced max-height for better responsiveness */
    object-fit: cover;
    border-radius: 10px;
  }

  .text-section {
    flex: 1.2;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;

    h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 0px;
    }

    h1 {
      font-size: 3rem; /* Reduced font size */
      font-weight: bold;
      margin: 0px 0;
      color: #007BFF;
    }

    p {
      font-size: 1rem;
      margin: 3px 0;
      color: #666;
    }
  }

  @media (max-width: 1200px) {
    padding: 0 10%;
  }

  @media (max-width: 992px) {
    padding: 0 8%;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack elements vertically on smaller screens */
    padding: 0 5%;

    img {
      max-height: 250px;
    }

    .text-section {
      padding: 10px;

      h2 {
        font-size: 1.5rem;
      }

      h1 {
        font-size: 2.5rem;
      }

      p {
        font-size: 0.9rem;
      }
    }
  }
`;

const BackButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 20px;
  left: calc(5% + 10px);

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
    left: 5%;
  }
`;

const FullWidthLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1300px;
  padding: 20px 5%;
  margin: 0 auto;
  font-size: 18px;
  color: #555;

  h3 {
    font-size: 26px;
    color: #007BFF;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 1px solid #007BFF;
    padding-bottom: 5px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }

    a {
      color: #007BFF;
      text-decoration: underline;

      &:hover {
        color: #0056b3;
      }
    }
  }

  img.resume {
    width: 100%;
    max-width: 400px; /* Adjusted for better responsiveness */
    margin: 0 auto; /* Center the image */
    display: block; /* Ensure block display for centering */
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.02); /* Reduced scaling for subtle zoom */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 1200px) {
      max-width: 350px;
    }

    @media (max-width: 992px) {
      max-width: 300px;
    }

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  /* Resumes Grid */
  .resumes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns on large screens */
    gap: 10px; /* Reduced gap for tighter alignment */
    padding-left: 0;
    list-style: none;
    justify-items: center; /* Center items horizontally */

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr); /* Maintain two columns on medium screens */
      gap: 8px;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr; /* Single column on smaller screens */
      gap: 10px;
    }

    @media (max-width: 480px) {
      gap: 8px;
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;

    h3 {
      font-size: 22px;
    }
  }
`;

// Modal Styled Components

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 35%;
  max-height: 35%;
  border-radius: 8px;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 80%;
    max-height: 70%;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    max-height: 60%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 25px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    font-size: 30px;
    right: 15px;
  }

  @media (max-width: 480px) {
    font-size: 25px;
    right: 10px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === 'left' ? 'left: 25px;' : 'right: 25px;')}
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px; /* Fixed width for circular shape */
  height: 40px; /* Fixed height for circular shape */
  font-size: 20px; /* Adjusted font size */
  padding: 0; /* Remove padding to maintain circular shape */
  border-radius: 50%; /* Circular shape */
  cursor: pointer;
  transform: translateY(-50%);
  transition: background-color 0.3s ease, transform 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 18px;
    ${({ direction }) =>
      direction === 'left'
        ? 'left: 15px;'
        : 'right: 15px;'}
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    ${({ direction }) =>
      direction === 'left'
        ? 'left: 10px;'
        : 'right: 10px;'}
  }
`;

// ScholarsStory Component

const ScholarsStory = () => {
  const navigate = useNavigate();
  const { id, scholarName } = useParams();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResumeIndex, setCurrentResumeIndex] = useState(0);
  const [currentResumeImages, setCurrentResumeImages] = useState([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close modal on ESC key and handle navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
      if (isModalOpen) {
        if (e.key === 'ArrowRight') {
          goToNext();
        }
        if (e.key === 'ArrowLeft') {
          goToPrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentResumeIndex, currentResumeImages]);

  const scholarship = scholarships.find((s) => s.id === id);
  const scholar = scholarship?.scholars?.find(
    (s) => s.contributorName.toLowerCase().replace(/\s+/g, '-') === scholarName
  );

  if (!scholarship || !scholar) {
    return (
      <StoryContainer>
        <p>Story not found.</p>
      </StoryContainer>
    );
  }

  const stories = scholar?.stories || [];

  const renderContent = (line) => {
    // Detect if the content is a URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(line)) {
      return (
        <a href={line} target="_blank" rel="noopener noreferrer">
          {line}
        </a>
      );
    }
    return line;
  };

  const openModal = (images, index) => {
    setCurrentResumeImages(images);
    setCurrentResumeIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNext = () => {
    setCurrentResumeIndex((prevIndex) =>
      prevIndex === currentResumeImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentResumeIndex((prevIndex) =>
      prevIndex === 0 ? currentResumeImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <FullWidthSection>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </BackButton>
          <img
            src={scholar.contributorImage || '/default-avatar.png'}
            alt={scholar.contributorName}
          />
          <div className="text-section">
            <h2>Meet</h2>
            <h1>{scholar.contributorName}</h1>
            {scholar.contactInformation && (
                      <a
                        href={
                          scholar.contactInformation.startsWith('@')
                            ? `https://instagram.com/${scholar.contactInformation.slice(1)}`
                            : scholar.contactInformation.startsWith('http')
                            ? scholar.contactInformation
                            : `https://instagram.com/${scholar.contactInformation}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-link"
                      >
                        <FaInstagram />
                        {scholar.contactInformation}
                      </a>
                    )}
            <p><strong>Course:</strong> {scholar.intendedCourse}</p>
            <p><strong>Current Institution:</strong> {scholar.currentInstitution}</p>
            <p><strong>Current Studies:</strong> {scholar.currentStudies}</p>
            {scholar.motivationalQuote && <p>"{scholar.motivationalQuote}"</p>}
          </div>
        </Header>

        {/* Line that spans the entire screen */}
        <FullWidthLine />
      </FullWidthSection>

      <Content>
        {stories.length > 0 ? (
          stories.map((story, storyIndex) => (
            <div key={storyIndex}>
              <h3>{story.title}</h3>
              <ul>
                {story.content.map((line, idx) => (
                  <li key={idx}>{renderContent(line)}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No stories available.</p>
        )}

        {/* Resumes Section */}
        {scholar.resumeImages && scholar.resumeImages.length > 0 && (
          <div>
            <h3>Resumes</h3>
            <ul className="resumes-grid">
              {scholar.resumeImages.map((resume, resumeIndex) => (
                <li key={resumeIndex}>
                  <img
                    src={resume}
                    alt={`Resume ${resumeIndex + 1} of ${scholar.contributorName}`}
                    className="resume"
                    onClick={() => openModal(scholar.resumeImages, resumeIndex)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Content>

      {/* Modal for Resume Images */}
      <ModalOverlay isOpen={isModalOpen} onClick={closeModal} aria-modal="true" role="dialog">
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalImage
            src={currentResumeImages[currentResumeIndex]}
            alt={`Resume ${currentResumeIndex + 1} of ${scholar.contributorName}`}
          />
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          {currentResumeImages.length > 1 && (
            <>
              <NavButton direction="left" onClick={goToPrev} aria-label="Previous Resume">
                &#10094;
              </NavButton>
              <NavButton direction="right" onClick={goToNext} aria-label="Next Resume">
                &#10095;
              </NavButton>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default ScholarsStory;
