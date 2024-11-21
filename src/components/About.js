// About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutTitle = styled.h1`
  font-size: 32px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 20px;
`;

const AboutDescription = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
`;

const TeamSection = styled.div`
  margin-top: 40px;
`;

const TeamTitle = styled.h2`
  font-size: 28px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 20px;
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const TeamMember = styled.div`
  text-align: center;
  max-width: 200px;
`;

const MemberImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
  border: 3px solid #007BFF;
  margin-bottom: 10px;
`;

const MemberName = styled.h3`
  font-size: 18px;
  color: #333;
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutTitle>About MSI</AboutTitle>
      <AboutDescription>
        The Malaysian Student Initiative (MSI) is dedicated to empowering students across the country by offering educational resources, mentorship, and guidance for achieving academic excellence and professional growth.
      </AboutDescription>

      <TeamSection>
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamGrid>
          <TeamMember>
            <MemberImage src="/path/to/image1.jpg" alt="Team Member 1" />
            <MemberName>John Doe</MemberName>
          </TeamMember>
          <TeamMember>
            <MemberImage src="/path/to/image2.jpg" alt="Team Member 2" />
            <MemberName>Jane Smith</MemberName>
          </TeamMember>
          <TeamMember>
            <MemberImage src="/path/to/image3.jpg" alt="Team Member 3" />
            <MemberName>Alex Johnson</MemberName>
          </TeamMember>
        </TeamGrid>
      </TeamSection>
    </AboutContainer>
  );
};

export default About;
