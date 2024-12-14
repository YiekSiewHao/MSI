import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaInstagram } from 'react-icons/fa';

/* Container for the entire About section */
const AboutContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

/* Define the fade-in-up animation */
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* Section with animation */
const Section = styled.section`
  margin: 60px 0;
  opacity: 0;
  animation: ${fadeInUp} 1s forwards;
  animation-delay: ${(props) => props.delay || '0s'};
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  &::after {
    content: '';
    width: 80px;
    height: 4px;
    background-color: #007bff;
    display: block;
    margin: 10px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
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

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  justify-content: center;
  margin-top: 30px;

  @media (max-width: 480px) {
    gap: 30px;
  }
`;

const TeamMember = styled.div`
  text-align: center;
  max-width: 350px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: ${fadeInUp} 1s forwards;
  animation-delay: ${(props) => props.delay || '0s'};

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #007bff;
    margin-bottom: 15px;
    margin-left: auto;
    margin-right: auto;
  }

  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    padding: 10px;

    img {
      width: 150px;
      height: 150px;
    }

    h3 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  a {
    display: flex;
    align-items: center;
    color: #e1306c;
    font-size: 16px;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #c13584;
    }

    svg {
      font-size: 24px;
      margin-right: 8px;
    }

    @media (max-width: 480px) {
      font-size: 14px;

      svg {
        font-size: 20px;
        margin-right: 6px;
      }
    }
  }
`;


const Quote = styled.blockquote`
  font-size: 16px;
  color: #555;
  font-style: italic;
  margin: 20px auto 0;
  padding: 0 20px;
  position: relative;
  max-width: 300px;
  text-align: center;

  &::before {
    content: open-quote;
    font-size: 32px;
    color: #007bff;
    position: absolute;
    left: -10px;
    top: -10px;
  }

  &::after {
    content: close-quote;
    font-size: 32px;
    color: #007bff;
    position: absolute;
    right: -10px;
    bottom: -10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    max-width: 250px;
  }
`;

const LogoContainer = styled.div`
  margin: 60px 0;
  text-align: center;

  img {
    max-width: 400px;
  }

  p {
    font-size: 18px;
    color: #555;
    margin-top: 0px;
  }

  @media (max-width: 480px) {
    img {
      max-width: 200px;
    }

    p {
      font-size: 14px;
      margin-top:0px;
    }
  }
`;

/* Vision & Mission Wrapper */
const VisionMissionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
`;

const RowBase = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  & > div {
    flex: 1;
    min-width: 280px;
  }
`;

const VisionRow = styled(RowBase)`
  .left {
    background-color: #4a90e2;
    color: white;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 28px;
      margin: 0;
    }
  }

  .right {
    padding: 30px;
    border: 2px solid #4a90e2;
    border-radius: 10px;
    text-align: left;
    background-color: #f9f9f9;

    p {
      margin-bottom: 15px;
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
  }

  @media (max-width: 480px) {
    .left, .right {
      padding: 20px;

      h3 {
        font-size: 24px;
      }

      p {
        font-size: 14px;
      }
    }
  }
`;

const MissionRow = styled(RowBase)`
  .left {
    padding: 30px;
    border: 2px solid #f06;
    border-radius: 10px;
    text-align: left;
    background-color: #f9f9f9;

    p {
      margin-bottom: 15px;
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
  }

  .right {
    background-color: #f06;
    color: white;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 28px;
      margin: 0;
    }
  }

  @media (max-width: 480px) {
    .left, .right {
      padding: 20px;

      h3 {
        font-size: 24px;
      }

      p {
        font-size: 14px;
      }
    }
  }
`;

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create refs for the sections
  const aboutRef = useRef(null);
  const foundersRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    const sections = [aboutRef.current, foundersRef.current, visionRef.current];
    const options = {
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <AboutContainer>
      {/* About MSI Section */}
      <Section ref={aboutRef}>
        <SectionTitle>About MSI</SectionTitle>
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

      {/* Meet the Founders Section */}
      <Section ref={foundersRef} delay="0.2s">
        <SectionTitle>Meet the Founders</SectionTitle>
        <TeamGrid>
          <TeamMember delay="0.4s">
            <img src="/assets/portrait/siew_hao.jpg" alt="Yiek Siew Hao" />
            <h3>Yiek Siew Hao</h3>
            <SocialLinks>
              <a href="https://www.instagram.com/siew_hao/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
                @siew_hao
              </a>
            </SocialLinks>
            <p><strong>Shell Scholar</strong></p>
            <p>Electrical and Electronic Engineering</p>
            <Quote>
              Stay curious, dream big, and believe your imagination can actually make an impact. Also, download <strong>EssayGuide</strong>!
            </Quote>
          </TeamMember>
          <TeamMember delay="0.6s">
            <img src="/assets/portrait/kai.jpg" alt="Siow Kai Yuan" />
            <h3>Siow Kai Yuan</h3>
            <SocialLinks>
              <a href="https://www.instagram.com/pumpkinsoda_0203/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
                @pumpkinsoda_0203
              </a>
            </SocialLinks>
            <p><strong>Petronas Scholar</strong></p>
            <p>Actuarial Science (Financial Risk)</p>
            <Quote>
              Don't be afraid to take risks if you are starting from the bottom, because you have nothing to lose.
            </Quote>
          </TeamMember>
          <TeamMember delay="0.8s">
            <img src="/assets/portrait/bryan.jpg" alt="Bryan Ngu" />
            <h3>Bryan Ngu Zhu Kiet</h3>
            <SocialLinks>
              <a href="https://www.instagram.com/ngubryan/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
                @ngubryan
              </a>
            </SocialLinks>
            <p><strong>Yayasan UEM Scholar</strong></p>
            <p>Data Science</p>
            <Quote>
              There might be a second chance, but there's definitely no second life for you. SO LIVE A LIFE YOU WILL REMEMBER.
            </Quote>
          </TeamMember>
        </TeamGrid>
      </Section>

      <LogoContainer>
        <img src="/assets/MSI_Logo.png" alt="MSI Logo" />
        <p>
          Shoutout to <strong>Ibrahim Lua Ming-Zhi</strong> and <strong>Eleanor Ting</strong> for designing the MSI logo. Your creativity and effort are deeply appreciated!
        </p>
      </LogoContainer>

      {/* Vision & Mission Section */}
      <Section ref={visionRef} delay="0.4s">
        <SectionTitle>Vision & Mission</SectionTitle>
        <VisionMissionWrapper>
          {/* Reordered sequence: Vision -> Text -> Mission -> Text */}
          <VisionRow>
            <div className="left">
              <h3>Vision</h3>
            </div>
            <div className="right">
              <p>
                <strong>MSI aims to equip Malaysian students with the knowledge, resources, and confidence to strive for well-rounded self-development.</strong> By providing insights about diverse academic pathways, scholarships, and career development opportunities, we aim to broaden their horizons and inspire them to make informed and confident decisions about their future education.
              </p>
            </div>
          </VisionRow>
          <MissionRow>
            <div className="right">
              <h3>Mission</h3>
            </div>
            <div className="left">
              <p>
                <strong>MSI's mission is to foster a generation of curious, motivated, and globally-minded students who are equipped to thrive in an ever-evolving educational landscape. </strong>By expanding students' knowledge of further study opportunities, we hope to spark a passion for lifelong learning and personal growth, both locally and around the nation.
              </p>
              <p>
                Ultimately, our goal is to cultivate a culture of exploration, ambition, and educational equity, where every student, regardless of background, has the tools and support to pursue their dreams and unleash their potential.
              </p>
            </div>
          </MissionRow>
        </VisionMissionWrapper>
      </Section>
    </AboutContainer>
  );
};

export default About;
