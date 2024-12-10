import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import essays from "../essays.json";

/* Styled Components */

/* Container for the entire Preparation section */
const PreparationContainer = styled.div`
  padding: 0;
`;

/* New Content Container for the rest of the content */
const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

/* Title Section with stylish background */
const TitleSection = styled.div`
  position: relative;
  width: 100%;
  padding: 80px 0;
  color: #ffffff;
  text-align: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImage});

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }

  h1 {
    position: relative;
    z-index: 1;
  }
`;

/* Main title */
const PreparationTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

/* Scholar Highlight Section */
const ScholarHighlightContainer = styled.div`
  padding: 40px 0;
  margin-bottom: 20px; 
`;

const HighlightHeader = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px; 
    transform: translateX(-50%);
    width: 60px; 
    height: 3px; 
    background-color: #007bff;
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const HighlightDescription = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ScholarSection = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 100%;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ScholarImage = styled.img`
  flex: 1;
  object-fit: cover;
  height: 100%;
  max-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    height: auto;
  }
`;

const ScholarDetails = styled.div`
  flex: 2;
  padding: 20px;
  color: #333;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ScholarName = styled.h3`
  font-size: 24px;
  color: #007bff; 
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ScholarMeta = styled.p`
  margin: 5px 0;
  font-size: 16px; 
  color: #7f8c8d;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ScholarDescription = styled.p`
  margin: 10px 0;
  font-size: 16px; 
  color: #7f8c8d;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ArrowIcon = styled(FaArrowRight)`
  color: #2c3e50;
  font-size: 40px;
  margin-left: auto;
  padding: 10px;

  @media (max-width: 768px) {
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const FilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
  
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.left ? "left: -20px;" : "right: -20px;")}
  background: rgba(255, 255, 255, 0.7);
  width: 40px;
  height: 40px;
  cursor: pointer;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 1;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    ${(props) => (props.left ? "left: 0;" : "right: 0;")}
  }
`;

const EssayCardContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px 0;

  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EssayCard = styled(Link)`
  flex: 0 0 90%;
  max-width: 300px;
  text-decoration: none;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: 600px) {
    flex: 0 0 80%;
    max-width: 70%;
  }

  @media (min-width: 768px) {
    flex: 0 0 70%;
    max-width: 60%;
  }

  @media (min-width: 1024px) {
    flex: 0 0 60%;
    max-width: 50%;
  }

  @media (min-width: 1440px) {
    flex: 0 0 50%;
    max-width: 40%;
  }

  @media (min-width: 1920px) {
    flex: 0 0 40%;
    max-width: 30%;
  }
`;

const CardTitle = styled.h3`
  font-size: 20px; 
  color: #007bff; 
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const EssayMeta = styled.div`
  font-size: 16px; 
  color: #555;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const EssayPreview = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-top: 10px;

  p {
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const InterviewSectionContainer = styled.div`
  /* Add horizontal padding that adjusts with screen size for spacing */
  padding: 0 60px; 
  margin-bottom: 100px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

/* For Interview Section modifications: smaller height, smaller text, maintain row layout where possible */
const InterviewHeader = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #007bff;
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const InterviewDescription = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const InterviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1300px;
`;

const InterviewItem = styled.li`
  display: flex;
  flex-direction: column; /* Stack content vertically */
  align-items: flex-start; /* Align content to the left */
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px; /* Adjusted padding for larger box */
  margin-bottom: 15px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 15px; /* Adjust padding for smaller screens */
  }
`;

const ScholarshipName = styled.span`
  font-size: 22px; /* Slightly larger font for better readability */
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 10px; /* Add spacing below the name */

  @media (max-width: 480px) {
    font-size: 18px;
    text-align: center;
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%; /* Ensure the group spans the full width */
  justify-content: space-between; /* Spread buttons evenly */
  gap: 10px; /* Add spacing between buttons */
  margin-top: 5px; /* Add spacing between the buttons and the name */

  @media (max-width: 480px) {
    justify-content: center; /* Center buttons on smaller screens */
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center; /* Center-align text horizontally */
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px; /* Slightly larger padding for better visibility */
  border-radius: 5px;
  font-size: 16px; /* Balanced font size */
  transition: background-color 0.3s;
  flex: 1; /* Make buttons equal width */

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const ViewButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center; /* Center-align text horizontally */
  background-color: #28a745;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px; /* Slightly larger padding for better visibility */
  border-radius: 5px;
  font-size: 16px; /* Balanced font size */
  transition: background-color 0.3s;
  flex: 1; /* Make buttons equal width */

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;



/* Motion Variants for Fade-In */
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const Preparation = () => {
  const scrollContainerRef = useRef(null);
  const [arrowLeftVisible, setArrowLeftVisible] = useState(false);
  const [arrowRightVisible, setArrowRightVisible] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState('All');

  const scholarships = [...new Set(essays.map((essay) => essay.scholarship))];
  const filteredEssays = selectedScholarship === 'All' ? essays : essays.filter(essay => essay.scholarship === selectedScholarship);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setArrowLeftVisible(container.scrollLeft > 0);
      setArrowRightVisible(container.scrollLeft < maxScrollLeft);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [filteredEssays]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scholarImagePath = "/assets/portrait/kohhuixin.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundImagePath = '/assets/preparation_wallpaper.jpg';

  return (
    <PreparationContainer>
      <TitleSection backgroundImage={backgroundImagePath}>
        <PreparationTitle>Preparation Materials</PreparationTitle>
      </TitleSection>

      {/* Fade-in for main content */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={fadeInVariants}
      >
        <ContentContainer>
          {/* Scholar Highlight Section */}
          <ScholarHighlightContainer>
            <HighlightHeader>Scholar's Highlight</HighlightHeader>
            <HighlightDescription>
              A huge shoutout to <strong style={{color: '#007bff'}}>Koh Hui Xin</strong> for contributing her resource pack to
              help future scholars prepare effectively. Click below to explore more!
            </HighlightDescription>
            <motion.div variants={fadeInVariants}>
              <ScholarSection to="/preparation/koh_hui_xin_resource_pack">
                <ScholarImage src={scholarImagePath} alt="Koh Hui Xin" />
                <ScholarDetails>
                  <ScholarName>Koh Hui Xin</ScholarName>
                  <ScholarMeta>
                    <strong>Scholarship:</strong> <span style={{color: '#007bff'}}>Bank Negara Malaysia Scholarship</span>
                  </ScholarMeta>
                  <ScholarMeta>
                    <strong>Course:</strong> <span style={{color: '#007bff'}}>BSc Computer Science, University of Manchester</span>
                  </ScholarMeta>
                  <ScholarDescription>
                    Koh Hui Xin has contributed an excellent resource pack to help
                    future scholars prepare effectively. Click to explore!
                  </ScholarDescription>
                </ScholarDetails>
                <ArrowIcon />
              </ScholarSection>
            </motion.div>
          </ScholarHighlightContainer>

          {/* Sample Essays Section */}
          <ScholarHighlightContainer>
            <HighlightHeader>Sample Essays</HighlightHeader>
            <HighlightDescription>
              Explore a curated collection of sample essays from successful scholarship applicants. These essays provide valuable insights into what makes a compelling application, helping you to craft your own standout essays.
            </HighlightDescription>

            {/* Filter Buttons */}
            <FilterBox>
              <FilterButton
                active={selectedScholarship === 'All'}
                onClick={() => setSelectedScholarship('All')}
              >
                All
              </FilterButton>
              {scholarships.map((scholarship) => (
                <FilterButton
                  key={scholarship}
                  active={selectedScholarship === scholarship}
                  onClick={() => setSelectedScholarship(scholarship)}
                >
                  {scholarship}
                </FilterButton>
              ))}
            </FilterBox>

            {/* Scrollable Essay Cards */}
            <ScrollContainer>
              {/* Left Arrow Button */}
              <ArrowButton left visible={arrowLeftVisible} onClick={scrollLeft}>
                <FaChevronLeft size={24} />
              </ArrowButton>

              {/* Essay Cards */}
              <EssayCardContainer ref={scrollContainerRef}>
                {filteredEssays.map((essay, index) => (
                  <EssayCard to={`/essay/${index}`} key={`${essay.scholarship}-${index}`}>
                    <CardTitle>{essay.scholarship}</CardTitle>
                    <EssayMeta>
                      <strong>Author:</strong> {essay.author} | <strong>Year:</strong>{" "}
                      {essay.year}
                    </EssayMeta>
                    <EssayPreview>
                      <p><strong>{essay.question[0]}</strong></p>
                      <Divider />
                      <p>{essay.essay[0].slice(0, 100)}...</p>
                      <span>
                        <strong>Read More</strong>
                      </span>
                    </EssayPreview>
                  </EssayCard>
                ))}
              </EssayCardContainer>

              {/* Right Arrow Button */}
              <ArrowButton visible={arrowRightVisible} onClick={scrollRight}>
                <FaChevronRight size={24} />
              </ArrowButton>
            </ScrollContainer>
          </ScholarHighlightContainer>
        </ContentContainer>

        {/* Interview Section with reduced height and font sizes */}
        <InterviewSectionContainer>
          <InterviewHeader>Interview Questions and Answers</InterviewHeader>
          <InterviewDescription>
            Prepare effectively for your interviews with these curated questions and answers from successful scholarship recipients.
          </InterviewDescription>

          <InterviewList>
            <InterviewItem>
              <ScholarshipName>Shell Scholarship</ScholarshipName>
              <ButtonGroup>
                <DownloadButton href="/assets/resource_pack_hui_xin.pdf" download>
                  Download PDF
                </DownloadButton>
                <ViewButton href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
                  View File
                </ViewButton>
              </ButtonGroup>
            </InterviewItem>
            <InterviewItem>
              <ScholarshipName>Petronas Scholarship</ScholarshipName>
              <ButtonGroup>
                <DownloadButton href="/assets/resource_pack_hui_xin.pdf" download>
                  Download PDF
                </DownloadButton>
                <ViewButton href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
                  View File
                </ViewButton>
              </ButtonGroup>
            </InterviewItem>

            <InterviewItem>
              <ScholarshipName>Yayasan UEM Scholarship</ScholarshipName>
              <ButtonGroup>
                <DownloadButton href="/assets/resource_pack_hui_xin.pdf" download>
                  Download PDF
                </DownloadButton>
                <ViewButton href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
                  View File
                </ViewButton>
              </ButtonGroup>
            </InterviewItem>

            <InterviewItem>
              <ScholarshipName>Yayasan Khazanah Scholarship</ScholarshipName>
              <ButtonGroup>
                <DownloadButton href="/assets/resource_pack_hui_xin.pdf" download>
                  Download PDF
                </DownloadButton>
                <ViewButton href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
                  View File
                </ViewButton>
              </ButtonGroup>
            </InterviewItem>

            <InterviewItem>
              <ScholarshipName>TNB Scholarship</ScholarshipName>
              <ButtonGroup>
                <DownloadButton href="/assets/resource_pack_hui_xin.pdf" download>
                  Download PDF
                </DownloadButton>
                <ViewButton href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
                  View File
                </ViewButton>
              </ButtonGroup>
            </InterviewItem>
          </InterviewList>
        </InterviewSectionContainer>
      </motion.div>
    </PreparationContainer>
  );
};

export default Preparation;
