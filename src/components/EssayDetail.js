import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import essays from "../essays.json";

const DetailContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
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
      <EssayContent>
        {essay.essay.map((paragraph, index) => (
          <p key={index}>{paragraph}</p> /* Render each paragraph with spacing */
        ))}
      </EssayContent>
    </DetailContainer>
  );
};

export default EssayDetail;
