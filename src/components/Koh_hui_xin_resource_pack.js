import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@mui/icons-material';

const ResourceContainer = styled.div`
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 40px;

  h2, h3, h4 {
    font-size: 24px;
    color: #007bff;
    margin-bottom: 15px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
  }

  p {
    font-size: 18px;
    color: #333;
    line-height: 1.8;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;

    li {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 1.6;
      color: #333;
    }
  }
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin-top: 30px;
  padding: 12px 20px;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const KohHuiXinResourcePack = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <ResourceContainer>
      <BackButton onClick={handleBack}>
        <ArrowBack /> Back
      </BackButton>

      <Title>Koh Hui Xin Resource Pack</Title>

      <Section>
        <p>
          My journey begins with a BNM scholarship—it’s not just an opportunity, but the
          foundation of my dreams. Without it, I wouldn’t have the chance to study abroad,
          work at a big tech company in the UK office, or take the first steps toward
          building my entrepreneurship skills. I hope that by sharing this resource pack
          that has helped hundreds of students across Malaysia over the past three years,
          I can inspire and help you shape your dreams, too.
        </p>
        <p>
          <strong>Disclaimer:</strong> All the resources provided here are strictly for use under
          Malaysian Student Initiative and are not for sale.
        </p>
      </Section>

      <Section>
        <h2>Part 1: Case Study Q&A</h2>
        <p>
          A case study typically revolves around analyzing a real-world problem or scenario and
          proposing actionable solutions. For this scholarship interview, the case study might involve
          addressing societal challenges such as education inequality, environmental issues,
          technological advancements, or economic development. It requires showcasing your ability
          to think critically, collaborate effectively, and innovate sustainably.
        </p>
        <h3>Good Points to Include in Your Response:</h3>
        <ul>
          <li>
            <strong>Provide Training/Workshops:</strong> Focus on skill-building programs tailored to the audience,
            highlight examples like coding bootcamps, hands-on AI training, or leadership workshops.
          </li>
          <li>
            <strong>Foster Collaboration:</strong> Partner with governments, NGOs, societies, and international organizations.
            Leverage these collaborations for funding, resources, and global impact.
          </li>
          <li>
            <strong>Encourage Innovation:</strong> Discuss creative solutions and technologies, emphasizing AI applications like
            predictive modeling, automation, or personalized learning systems. Mention real-life examples where
            AI has been used to tackle pressing challenges.
          </li>
          <li>
            <strong>Balance Short-Term and Long-Term Solutions:</strong> 
            <ul>
              <li>Short-term: Quick wins like online webinars or competitions.</li>
              <li>Long-term: Structured education programs, sustainable partnerships, and infrastructure development.</li>
            </ul>
          </li>
          <li>
            <strong>Promote Education and Engagement:</strong> Take inspiration from initiatives by big companies, e.g.,
            free courses by Google, AI hackathons by Microsoft, or virtual events by IBM. Emphasize global outreach
            through virtual platforms and competitions.
          </li>
        </ul>
      </Section>

      <Section>
        <h2>Case Study 1: Educational Access</h2>
        <p>
          You are part of a scholarship committee that aims to improve educational access for
          underprivileged students in rural areas. You have limited resources and need to develop
          a plan to allocate scholarships effectively.
        </p>
        <h3>Proposed Solution:</h3>
        <p>
          To improve educational access for underprivileged students in rural areas, I would
          design a comprehensive scholarship program. The program would include a multi-step
          process starting with a robust selection criteria that identifies students based on
          their financial needs, academic potential, and commitment to education.
        </p>
        <p>
          Once selected, the program would provide financial support to cover tuition fees,
          textbooks, and transportation costs. Additionally, mentorship programs and tutoring
          services would be established to ensure their continued academic progress. Regular
          monitoring and evaluation of the recipients' performance and feedback from teachers
          would help identify areas where additional support is needed.
        </p>
        <p>
          To measure the impact of the scholarships, I would collect data on academic
          performance, graduation rates, and feedback from the scholarship recipients and
          their families. Surveys and interviews would be conducted to assess the students'
          perception of the program's effectiveness.
        </p>
      </Section>

      <Section>
        <h2>Case Study 2: Environmental Conservation</h2>
        <p>
          You are involved in a project that supports students interested in environmental conservation.
          The team wants to initiate a project that addresses deforestation in a nearby rainforest.
          How would you assess the feasibility of their project?
        </p>
        <h3>Hints:</h3>
        <p>
          Including potential challenges and solutions, and how would you evaluate the impact of their efforts
          on the local community and the environment.
        </p>
        <p>
          To assess the feasibility of the scholarship recipients' project on addressing deforestation, I
          would first conduct a thorough environmental impact assessment. This assessment would involve
          identifying the causes and extent of deforestation in the targeted rainforest area, researching
          existing conservation efforts, and consulting with environmental experts.
        </p>
        <p>
          Challenges such as securing necessary permits, funding, and community cooperation may arise.
          Solutions could involve collaborating with local environmental organizations and government
          agencies to obtain support and resources. Engaging the local community through awareness
          campaigns, education initiatives, and involving them in the project planning and implementation
          process could foster cooperation.
        </p>
        <p>
          To evaluate the impact of the project, key metrics such as the area of reforestation,
          biodiversity restoration, and the reduction in illegal logging activities could be monitored.
          Additionally, surveys and interviews with the local community and stakeholders would help
          gauge the project's social impact.
        </p>
      </Section>

      <DownloadLink href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
        Download Full Resource Pack
      </DownloadLink>
    </ResourceContainer>
  );
};

export default KohHuiXinResourcePack;
