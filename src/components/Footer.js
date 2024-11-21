import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #007BFF;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterText>&copy; 2024 Malaysian Student Initiative. All Rights Reserved.</FooterText>
      <FooterText>Contact us: info@msinitiative.com | Phone: +60 123-456-789</FooterText>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
