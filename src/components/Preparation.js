import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import essays from "../essays.json";

const PreparationContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
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

const EssayCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  return (
    <PreparationContainer>
      <PreparationTitle>Preparation Materials</PreparationTitle>
      <SubHeading>Sample Essays</SubHeading>
      <EssayCardContainer>
        {essays.map((essay, index) => (
          <EssayCard to={`/essay/${index}`} key={index}>
            <CardTitle>{essay.scholarship}</CardTitle>
            <EssayMeta>
              <strong>Author:</strong> {essay.author} | <strong>Year:</strong> {essay.year}
            </EssayMeta>
            <EssayPreview>
              <p>{essay.question[0]}</p> {/* Show only the first question */}
              <Divider /> {/* Add a line between question and sample essay */}
              <p>{essay.essay[0].slice(0, 250)}...</p> {/* Show a shortened version of the first paragraph */}
              <span><strong>Read More</strong></span>
            </EssayPreview>
          </EssayCard>
        ))}
      </EssayCardContainer>
    </PreparationContainer>
  );
};

export default Preparation;
