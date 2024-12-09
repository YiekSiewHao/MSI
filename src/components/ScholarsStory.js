import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import scholarships from '../scholarships.json';
import { ArrowBack } from '@mui/icons-material';

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

  img {
    flex: 1.7;
    width: 100%;
    max-height: 600px;
    object-fit: cover;
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
      font-size: 3.5rem;
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

  @media (max-width: 768px) {
    flex-direction: column; /* Stack elements vertically on smaller screens */
    padding: 0 10%;

    img {
      max-height: 300px;
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
  }
`;

const FullWidthLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1300px;
  padding: 0 5%;
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
    max-width: 800px;
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    h3 {
      font-size: 22px;
    }
  }
`;

const ScholarsStory = () => {
  const navigate = useNavigate();
  const { id, scholarName } = useParams();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scholarship = scholarships.find((s) => s.id === id);
  const scholar = scholarship?.scholars?.find(
    (s) =>
      s.contributorName.toLowerCase().replace(/\s+/g, '-') === scholarName
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
            <p>{scholar.intendedCourse}</p>
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
              {story.resumeImage && (
                <div>
                  <img
                    src={story.resumeImage}
                    alt="Sample Resume"
                    className="resume"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No stories available.</p>
        )}
      </Content>
    </>
  );
};

export default ScholarsStory;
