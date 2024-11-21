import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import scholarships from '../scholarships.json';
import { ArrowBack } from '@mui/icons-material';

const StoryContainer = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 2px solid #007BFF;
  }

  h1 {
    font-size: 28px;
    color: #007BFF;
    margin-bottom: 5px;
  }

  h3 {
    font-size: 20px;
    color: #555;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #888;
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

const Content = styled.div`
  font-size: 16px;
  color: #555;

  h3 {
    font-size: 22px;
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

  return (
    <StoryContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </BackButton>
      <Header>
        <img src={scholar.contributorImage || '/default-avatar.png'} alt={scholar.contributorName} />
        <h1>{scholar.contributorName}</h1>
        <h3>{scholar.intendedCourse}</h3>
        {scholar.motivationalQuote && <p>"{scholar.motivationalQuote}"</p>}
      </Header>
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
                  <img src={story.resumeImage} alt="Sample Resume" className="resume" />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No stories available.</p>
        )}
      </Content>
    </StoryContainer>
  );
};

export default ScholarsStory;
