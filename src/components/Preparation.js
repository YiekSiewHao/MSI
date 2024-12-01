import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import essays from "../essays.json";

const PreparationContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PreparationTitle = styled.h1`
  font-size: 28px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 10px;
`;

const SubHeading = styled.h2`
  font-size: 22px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;
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
  font-size: 4px;
  margin-left: auto;
  padding: 10px; /* Add space around the arrow */
`;


const EssayCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const EssayCard = styled(Link)`
  text-decoration: none;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const EssayMeta = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
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
`;

const Preparation = () => {
  const scholarImagePath = "/assets/portrait/kohhuixin.jpg";

  return (
    <PreparationContainer>
      <PreparationTitle>Preparation Materials</PreparationTitle>

      <ScholarHighlightContainer>
        <HighlightHeader>Scholar's Highlight</HighlightHeader>
        <HighlightDescription>
          A huge shoutout to Koh Hui Xin for contributing her resource pack to help future scholars prepare effectively. Click below to explore more!
        </HighlightDescription>
        <ScholarSection to="/preparation/koh_hui_xin_resource_pack">
          <ScholarImage src={scholarImagePath} alt="Koh Hui Xin" />
          <ScholarDetails>
            <ScholarName>Koh Hui Xin</ScholarName>
            <ScholarMeta><strong>Scholarship:</strong> Bank Negara Malaysia Scholarship</ScholarMeta>
            <ScholarMeta><strong>Course:</strong> BSc Computer Science, University of Manchester</ScholarMeta>
            <ScholarDescription>
              Koh Hui Xin has contributed an excellent resource pack to help future scholars prepare effectively. Click to explore!
            </ScholarDescription>
          </ScholarDetails>
          <ArrowIcon />
        </ScholarSection>
      </ScholarHighlightContainer>

      <SubHeading>Sample Essays</SubHeading>
      <EssayCardContainer>
        {essays.map((essay, index) => (
          <EssayCard to={`/essay/${index}`} key={index}>
            <CardTitle>{essay.scholarship}</CardTitle>
            <EssayMeta>
              <strong>Author:</strong> {essay.author} | <strong>Year:</strong> {essay.year}
            </EssayMeta>
            <EssayPreview>
              <p>{essay.question[0]}</p>
              <Divider />
              <p>{essay.essay[0].slice(0, 250)}...</p>
              <span><strong>Read More</strong></span>
            </EssayPreview>
          </EssayCard>
        ))}
      </EssayCardContainer>
    </PreparationContainer>
  );
};

export default Preparation;
