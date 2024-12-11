// src/components/EssayDetail.js

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowBack } from "@mui/icons-material";
import essays from "../essays.json";

/* Styled Components */

const DetailContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
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
  position: relative;
  left: -10px;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const DetailTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const SectionHeading = styled.h2`
  font-size: 22px;
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
`;

const QuestionList = styled.ul`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  padding-left: 20px;
  list-style-type: disc;

  li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

const EssayContent = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-top: 20px;

  p {
    margin-bottom: 20px; /* Adds spacing between paragraphs */
  }
`;

const EssayDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Use navigate to handle back navigation

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page starts at the top
  }, []);

  const essay = essays.find(e => e.id === parseInt(id, 10)); // Fetch the corresponding essay

  if (!essay) {
    return <p>Essay not found</p>;
  }

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <DetailContainer>
      <BackButton onClick={handleBack}>
        <ArrowBack />
      </BackButton>
      <DetailTitle>{essay.scholarship}</DetailTitle>
      <SubText>
        <strong>Author:</strong> {essay.author} | <strong>Year:</strong> {essay.year}
      </SubText>

      <SectionHeading>Questions</SectionHeading>
      <QuestionList>
        {essay.question.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </QuestionList>

      <SectionHeading>Essay</SectionHeading>
      <EssayContent>
        {essay.essay.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </EssayContent>
    </DetailContainer>
  );
};

export default EssayDetail;
