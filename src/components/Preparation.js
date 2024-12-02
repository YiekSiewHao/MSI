import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import essays from "../essays.json";

/* Styled Components */

/* Container for the entire Preparation section */
const PreparationContainer = styled.div`
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

/* Main title */
const PreparationTitle = styled.h1`
  font-size: 28px;
  color: #007bff;
  text-align: center;
  margin-bottom: 10px;
`;

/* Subheading for sections */
const SubHeading = styled.h2`
  font-size: 22px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

/* Scholar Highlight Section */
const ScholarHighlightContainer = styled.div`
  margin-bottom: 40px;
`;

const HighlightHeader = styled.h2`
  font-size: 24px;
  color: #2c3e50; /* Darker neutral color */
  margin-bottom: 10px;
  text-align: center;
`;

const HighlightDescription = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 20px;
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

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ScholarImage = styled.img`
  flex: 1;
  object-fit: cover;
  height: 100%;
  max-width: 250px;
`;

const ScholarDetails = styled.div`
  flex: 2;
  padding: 20px;
  color: #333;
`;

const ScholarName = styled.h3`
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const ScholarMeta = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #7f8c8d;
`;

const ScholarDescription = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #7f8c8d;
`;

const ArrowIcon = styled(FaArrowRight)`
  color: #2c3e50;
  font-size: 40px;
  margin-left: auto;
  padding: 10px; /* Add space around the arrow */
`;

/* Scrolling Feature Styled Components */

/* Container to hold the scrolling area and arrows */
const ScrollContainer = styled.div`
  position: relative;
  margin-bottom: 40px; /* Add space below the scroll area */
`;

/* Left and Right Arrow Buttons */
const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.left ? "left: -20px;" : "right: -20px;")}
  background: rgba(255, 255, 255, 0.7);
  width: 40px; /* Set equal width and height */
  height: 40px;
  cursor: pointer;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 1;
  border-radius: 50%; /* Makes the square into a circle */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex; /* Center the icon inside */
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;


/* Scrollable container for the essay cards */
const EssayCardContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px 0;

  /* Hide scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

/* Individual Essay Card */
const EssayCard = styled(Link)`
  width: 350px;
  flex-shrink: 0;
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
`;

/* Title of the Essay Card */
const CardTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

/* Meta information about the essay */
const EssayMeta = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

/* Divider line */
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

/* Preview text of the essay */
const EssayPreview = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-top: 10px;

  p {
    margin-bottom: 10px;
  }
`;

/* Main Component */
const Preparation = () => {
  /* Reference to the scrollable container */
  const scrollContainerRef = useRef(null);

  /* State to manage the visibility of the left and right arrows */
  const [arrowLeftVisible, setArrowLeftVisible] = useState(false);
  const [arrowRightVisible, setArrowRightVisible] = useState(true);

  /* Handle scroll event to show/hide arrows */
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setArrowLeftVisible(container.scrollLeft > 0);
      setArrowRightVisible(container.scrollLeft < maxScrollLeft);
    }
  };

  /* Attach scroll event listener */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  /* Scroll the container to the left */
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  /* Scroll the container to the right */
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

  return (
    <PreparationContainer>
      <PreparationTitle>Preparation Materials</PreparationTitle>

      {/* Scholar Highlight Section */}
      <ScholarHighlightContainer>
        <HighlightHeader>Scholar's Highlight</HighlightHeader>
        <HighlightDescription>
          A huge shoutout to Koh Hui Xin for contributing her resource pack to
          help future scholars prepare effectively. Click below to explore more!
        </HighlightDescription>
        <ScholarSection to="/preparation/koh_hui_xin_resource_pack">
          <ScholarImage src={scholarImagePath} alt="Koh Hui Xin" />
          <ScholarDetails>
            <ScholarName>Koh Hui Xin</ScholarName>
            <ScholarMeta>
              <strong>Scholarship:</strong> Bank Negara Malaysia Scholarship
            </ScholarMeta>
            <ScholarMeta>
              <strong>Course:</strong> BSc Computer Science, University of
              Manchester
            </ScholarMeta>
            <ScholarDescription>
              Koh Hui Xin has contributed an excellent resource pack to help
              future scholars prepare effectively. Click to explore!
            </ScholarDescription>
          </ScholarDetails>
          <ArrowIcon />
        </ScholarSection>
      </ScholarHighlightContainer>

      {/* Sample Essays Section with Scrolling Feature */}
      <HighlightHeader>Sample Essays</HighlightHeader>
        <HighlightDescription>
        Explore a curated collection of sample essays from successful scholarship applicants. These essays provide valuable insights into what makes a compelling application, helping you to craft your own standout essays.
        </HighlightDescription>
      <ScrollContainer>
        {/* Left Arrow Button */}
        <ArrowButton left visible={arrowLeftVisible} onClick={scrollLeft}>
          <FaChevronLeft size={24} />
        </ArrowButton>

        {/* Scrollable Essay Cards */}
        <EssayCardContainer ref={scrollContainerRef}>
          {essays.map((essay, index) => (
            <EssayCard to={`/essay/${index}`} key={index}>
              <CardTitle>{essay.scholarship}</CardTitle>
              <EssayMeta>
                <strong>Author:</strong> {essay.author} | <strong>Year:</strong>{" "}
                {essay.year}
              </EssayMeta>
              <EssayPreview>
                <p>{essay.question[0]}</p>
                <Divider />
                <p>{essay.essay[0].slice(0, 250)}...</p>
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
    </PreparationContainer>
  );
};

export default Preparation;
