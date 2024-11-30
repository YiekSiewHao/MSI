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
  justify-content: space-between; /* Align text to start and end */
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap; /* Ensure responsiveness */
  max-width: 1400px; /* Reduce the overall width for better spacing */
  margin: 0 auto;
  padding: 10px 20px; /* Add padding to control text spacing */
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
`;

const FooterTextRight = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  text-align: right;
  flex: 1;
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterTextLeft>
        &copy; 2024 <strong>Malaysian Student Initiative</strong>. All Rights Reserved.
      </FooterTextLeft>
      <FooterTextRight>Empowering Futures Since 2024</FooterTextRight>
    </FooterContent>
  </FooterContainer>
);

export default Footer;