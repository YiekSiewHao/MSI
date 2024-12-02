import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import essays from "../essays.json";

/* Styled Components */

/* Container for the entire Preparation section */
const PreparationContainer = styled.div`
  padding: 0; /* Remove padding to allow the title to span the full width */
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

  /* Optional: Add a semi-transparent overlay if needed */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Adjust opacity as needed */
    z-index: 0;
  }

  /* Ensure the title text appears above the overlay */
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
`;

/* Scholar Highlight Section */
const ScholarHighlightContainer = styled.div`
  padding: 40px 0; /* Adjusted padding */
  margin-bottom: 20px; /* Reduced spacing */
`;

/* Custom Underlined Heading */
const HighlightHeader = styled.h2`
  font-size: 28px; /* Increased font size */
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px; /* Adjust as needed */
    transform: translateX(-50%);
    width: 60px; /* Length of the underline */
    height: 3px; /* Thickness */
    background-color: #007bff; /* Blue color */
    border-radius: 2px;
  }
`;

const HighlightDescription = styled.p`
  font-size: 18px; /* Increased font size */
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
  font-size: 24px; /* Increased font size */
  color: #007bff; /* Changed to blue color */
  margin-bottom: 10px;
`;

const ScholarMeta = styled.p`
  margin: 5px 0;
  font-size: 16px; /* Increased font size */
  color: #7f8c8d;
`;

const ScholarDescription = styled.p`
  margin: 10px 0;
  font-size: 16px; /* Increased font size */
  color: #7f8c8d;
`;

/* Arrow Icon */
const ArrowIcon = styled(FaArrowRight)`
  color: #2c3e50;
  font-size: 40px;
  margin-left: auto;
  padding: 10px;
`;

/* Filter Box */
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

/* Scroll Container and Arrow Buttons */
const ScrollContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

/* Left and Right Arrow Buttons */
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
`;

/* Scrollable container for the essay cards */
const EssayCardContainer = styled.div`
  display: flex;
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


/* Title of the Essay Card */
const CardTitle = styled.h3`
  font-size: 20px; /* Increased font size */
  color: #007bff; /* Changed to blue color */
  margin-bottom: 10px;
`;

/* Meta information about the essay */
const EssayMeta = styled.div`
  font-size: 16px; /* Increased font size */
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

const InterviewSectionContainer = styled.div`
  padding: 0;
  margin-bottom: 100px;
`;

/* Interview Header */
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
`;

/* Interview Description */
const InterviewDescription = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 20px;
`;

/* Interview List */
const InterviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1200px;
`;

/* Interview Item */
const InterviewItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

/* Scholarship Name */
const ScholarshipName = styled.span`
  font-size: 18px;
  color: #2c3e50;
  font-weight: 600;
`;

/* Download Button */
const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

/* View Button */
/* View Button */
const ViewButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #28a745;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

/* Button Group */
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;


/* Main Component */
const Preparation = () => {
  /* Reference to the scrollable container */
  const scrollContainerRef = useRef(null);

  /* State to manage the visibility of the left and right arrows */
  const [arrowLeftVisible, setArrowLeftVisible] = useState(false);
  const [arrowRightVisible, setArrowRightVisible] = useState(true);

  /* State to manage the selected scholarship filter */
  const [selectedScholarship, setSelectedScholarship] = useState('All');

  /* Extract unique scholarships from essays */
  const scholarships = [...new Set(essays.map((essay) => essay.scholarship))];

  /* Filtered essays based on selected scholarship */
  const filteredEssays = selectedScholarship === 'All' ? essays : essays.filter(essay => essay.scholarship === selectedScholarship);

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
  }, [filteredEssays]);

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

  const backgroundImagePath = '/assets/preparation_wallpaper.jpg'; // Replace with your image path

  return (
    <PreparationContainer>
      <TitleSection backgroundImage={backgroundImagePath}>
        <PreparationTitle>Preparation Materials</PreparationTitle>
      </TitleSection>

      <ContentContainer>
        {/* Scholar Highlight Section */}
        <ScholarHighlightContainer>
          <HighlightHeader>Scholar's Highlight</HighlightHeader>
          <HighlightDescription>
            A huge shoutout to <strong style={{color: '#007bff'}}>Koh Hui Xin</strong> for contributing her resource pack to
            help future scholars prepare effectively. Click below to explore more!
          </HighlightDescription>
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


    {/* Repeat for other scholarships */}
  </InterviewList>
</InterviewSectionContainer>
    </PreparationContainer>
  );
};

export default Preparation;
