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

const ScholarSection = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between text and arrow */
  margin-bottom: 40px;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ScholarImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ScholarDetails = styled.div`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

const ScholarName = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
  color: #007BFF;
`;

const ScholarMeta = styled.p`
  margin: 5px 0;
`;

const ScholarDescription = styled.p`
  margin: 10px 0;
  color: #555;
`;

const ArrowIcon = styled(FaArrowRight)`
  flex-shrink: 0;
  color: #007BFF;
  font-size: 24px;
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

      <SubHeading>Scholar Highlight</SubHeading>
      <ScholarSection to="/preparation/koh_hui_xin_resource_pack">
        <ScholarImage src={scholarImagePath} alt="Koh Hui Xin" />
        <ScholarDetails>
          <ScholarName>Koh Hui Xin</ScholarName>
          <ScholarMeta><strong>Scholarship:</strong> Shell Scholarship</ScholarMeta>
          <ScholarMeta><strong>Course:</strong> BSc Computer Science, University of Manchester</ScholarMeta>
          <ScholarDescription>
            Koh Hui Xin has contributed an excellent resource pack to help future scholars prepare effectively. Click to explore!
          </ScholarDescription>
        </ScholarDetails>
        <ArrowIcon />
      </ScholarSection>

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
