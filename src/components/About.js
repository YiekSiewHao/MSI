// About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 20px; /* Reduced side padding */
  max-width: 1400px; /* Increased max-width for wider content */
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  color: #007BFF;
  text-align: center; /* Centered heading */
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    width: 60px;
    height: 4px;
    background-color: #007BFF;
    display: block;
    margin: 8px auto 0;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px; /* Increased content width */
  margin: 0 auto;
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
`;

const TeamMember = styled.div`
  text-align: center;
  max-width: 200px;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #007BFF;
  margin-bottom: 15px;
`;

const MemberName = styled.h3`
  font-size: 20px;
  color: #333;
`;

const About = () => {
  return (
    <AboutContainer>
      <Section>
        <SectionTitle>About Us</SectionTitle>
        <SectionContent>
          <p>
            The Malaysian Student Initiative (MSI) is an open platform dedicated to helping secondary school students discover opportunities for better personal and academic growth. MSI provides a comprehensive website including tips and tricks for self-development, and detailed information on various scholarships.
          </p>
          <p>
            Beyond just being a source of information, MSI empowers students and scholars to take an active role in spreading knowledge. Anyone can become a "Local Lead" to organize events and workshops at their own secondary schools, sharing first-hand experiences and practical advice about education. MSI supports these Local Leads by providing all necessary materials, guidance, and resources, ensuring that the preparation process is smooth and effective.
          </p>
          <p>
            Through MSI, we aim to create a community where students feel informed, supported, and motivated to pursue their educational dreams without barriers.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Meet the Founders</SectionTitle>
        <TeamGrid>
          <TeamMember>
            <MemberImage src="/assets/portrait/siew_hao.jpg" alt="Siew Hao" />
            <MemberName>Siew Hao</MemberName>
          </TeamMember>
          <TeamMember>
            <MemberImage src="/assets/portrait/kai.jpg" alt="Kai" />
            <MemberName>Kai</MemberName>
          </TeamMember>
          <TeamMember>
            <MemberImage src="/assets/portrait/bryan.jpg" alt="Bryan" />
            <MemberName>Bryan</MemberName>
          </TeamMember>
          {/* Add more team members as needed */}
        </TeamGrid>
      </Section>

      <Section>
        <SectionTitle>Vision</SectionTitle>
        <SectionContent>
          <p>
            MSI aims to equip Malaysian students with the knowledge, resources, and confidence to strive for well-rounded self-development. By providing insights about diverse academic pathways, scholarships, and career development opportunities, we aim to broaden their horizons and inspire them to make informed and confident decisions about their future education.
          </p>
          <p>
            Through this initiative, we seek to break down barriers such as lack of awareness, financial constraints, limited exposure to tertiary study options, and tips or tricks to tackle the obstacles along the academic journey. We will create an inclusive platform that connects students to a broad range of resources, guidance from scholars, and expert advice on navigating the complexities of higher education.
          </p>
          <p>
            Ultimately, our goal is to cultivate a culture of exploration, ambition, and educational equity, where every student, regardless of background, has the tools and support to pursue their dreams and unleash their potential.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Mission</SectionTitle>
        <SectionContent>
          <p>
            MSI was given a mission to foster a generation of curious, motivated, and globally-minded students who are equipped to thrive in an ever-evolving educational landscape. By expanding students' knowledge of further study opportunities, we hope to spark a passion for lifelong learning and personal growth, both at local and around the nation.
          </p>
        </SectionContent>
      </Section>
    </AboutContainer>
  );
};

export default About;
