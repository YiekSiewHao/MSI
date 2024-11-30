import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import essays from "../essays.json";

const DetailContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  font-size: 16px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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
  const essay = essays[id]; // Fetch the corresponding essay

  if (!essay) {
    return <p>Essay not found</p>;
  }

  return (
    <DetailContainer>
      <BackLink to="/preparation">← Back to Preparation</BackLink>
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
