import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, blue, #f9a8); /* Gradient inspired by the "Our Story" section */
  padding: 60px 20px;
  text-align: center;
  color: white;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    font-size: 20px;
    line-height: 1.6;
  }
`;

const Section = styled.section`
  margin: 60px 0;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  &::after {
    content: '';
    width: 80px;
    height: 4px;
    background-color: #f06;
    display: block;
    margin: 10px auto 0;
  }
`;

const SectionContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  text-align: justify;

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
  max-width: 250px;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #f06;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 22px;
    color: #333;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #666;
  }
`;

const VisionMissionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
`;

const VisionRow = styled.div`
  display: flex;
  gap: 20px;

  & > div {
    flex: 1;
  }

  .left {
    background-color: #4a90e2;
    color: white;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right {
    padding: 30px;
    border: 2px solid #4a90e2;
    border-radius: 10px;
    text-align: left;
    background-color: #f9f9f9;
  }
`;

const MissionRow = styled.div`
  display: flex;
  gap: 20px;

  & > div {
    flex: 1;
  }

  .left {
    padding: 30px;
    border: 2px solid #f06;
    border-radius: 10px;
    text-align: left;
    background-color: #f9f9f9;
  }

  .right {
    background-color: #f06;
    color: white;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <h1>Welcome to MSI</h1>
        <p>
          Empowering Malaysian students with opportunities and resources for a brighter future.
        </p>
      </HeroSection>

      <Section>
        <SectionTitle>Meet the Founders</SectionTitle>
        <TeamGrid>
          <TeamMember>
            <img src="/assets/portrait/siew_hao.jpg" alt="Siew Hao" />
            <h3>Siew Hao</h3>
            <p>Founder and visionary behind MSI, dedicated to empowering students.</p>
          </TeamMember>
          <TeamMember>
            <img src="/assets/portrait/kai.jpg" alt="Kai" />
            <h3>Kai</h3>
            <p>Co-founder with expertise in academic mentoring and event coordination.</p>
          </TeamMember>
          <TeamMember>
            <img src="/assets/portrait/bryan.jpg" alt="Bryan" />
            <h3>Bryan</h3>
            <p>Technical lead and strategist, focused on digital solutions for education.</p>
          </TeamMember>
        </TeamGrid>
      </Section>
      
      <Section>
        <SectionTitle>About Us</SectionTitle>
        <SectionContent>
          <p>
          The Malaysian Student Initiative (MSI) is an open platform dedicated to helping secondary school students discover opportunities for better personal and academic growth. MSI provides a comprehensive website including tips and tricks for self development, and detailed information on various scholarships.
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
        <SectionTitle>Vision & Mission</SectionTitle>
        <VisionMissionWrapper>
          <VisionRow>
            <div className="left">
              <h3>Vision</h3>
            </div>
            <div className="right">
              <p>
              MSI aims to equip Malaysian students with the knowledge, resources, and confidence to strive for well-rounded self development. By providing insights about diverse academic pathways, scholarships, and career development opportunities, we aim to broaden their horizons and inspire them to make informed and confident decisions about their future education.
              </p>
            </div>
          </VisionRow>
          <MissionRow>
            <div className="left">
            <p>
              MSI was given a mission to foster a generation of curious, motivated, and globally-minded students who are equipped to thrive in an ever-evolving educational landscape. By expanding students' knowledge of further study opportunities, we hope to spark a passion for lifelong learning and personal growth, both at local and around the nation.
              </p>
              <p>
              Ultimately, our goal is to cultivate a culture of exploration, ambition, and educational equity, where every student, regardless of background, has the tools and support to pursue their dreams and unleash their potential.
              </p>
            </div>
            <div className="right">
              <h3>Mission</h3>
            </div>
          </MissionRow>
        </VisionMissionWrapper>
      </Section>
    </AboutContainer>
  );
};

export default About;
