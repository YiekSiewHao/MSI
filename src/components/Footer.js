import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #007BFF;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin: 0;
  position: static;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FooterTextLeft = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  text-align: left;
  flex: 1;

  strong {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const FooterTextRight = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  text-align: right;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 12px;
    text-align: center;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterTextLeft>
        &copy; 2025 <strong>Malaysian Student Initiative</strong>. All Rights Reserved.
      </FooterTextLeft>
      <FooterTextRight>Making a Significant Impact Since 2025</FooterTextRight>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
