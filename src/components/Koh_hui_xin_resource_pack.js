import React, { useState, useEffect } from 'react';
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

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#f1f1f1')};
  color: ${({ active }) => (active ? '#ffffff' : '#333')};
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin: 0 auto 40px auto;
  padding: 12px 20px;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  display: block;
  width: fit-content;

  &:hover {
    background-color: #218838;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;

  h2, h3, h4 {
    font-size: 24px;
    color: #007bff;
    margin-bottom: 15px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 18px;
    color: #333;
    line-height: 1.8;
    margin-bottom: 15px;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;

    li {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 1.6;
      color: #333;

      @media (max-width: 480px) {
        font-size: 16px;
      }
    }
  }
`;

const KohHuiXinResourcePack = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('caseStudy');

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  

  return (
    <ResourceContainer>
      <BackButton onClick={handleBack}>
        <ArrowBack />
      </BackButton>

      <Title>Koh Hui Xin Resource Pack</Title>

      <Section>
            <p>
              My journey begins with a BNM scholarship—it’s not just an opportunity, but the foundation of my dreams. Without it, I wouldn’t have the chance to study abroad, work at a big tech company in the UK office, or take the first steps toward building my entrepreneurship skills. I hope that by sharing this resource pack that has helped hundreds of students across Malaysia over the past three years, I can inspire and help you shape your dreams, too.
            </p>
            <p>
              <strong>Disclaimer:</strong> All the resources provided here are strictly for use under Malaysian Student Initiative and are not for sale.
            </p>
          </Section>

      
      <DownloadLink href="/assets/resource_pack_hui_xin.pdf" target="_blank" rel="noopener noreferrer">
        Download Full Resource Pack
      </DownloadLink>

      <TabContainer>
        <TabButton active={activeTab === 'caseStudy'} onClick={() => setActiveTab('caseStudy')}>
          Case Studies
        </TabButton>
        <TabButton active={activeTab === 'appealLetter'} onClick={() => setActiveTab('appealLetter')}>
          Appeal Letters
        </TabButton>
      </TabContainer>

      {activeTab === 'caseStudy' && (
        <>
          <Section>
            <h2>Part 1: Case Study QNA</h2>
            <p>
              A case study typically revolves around analyzing a real-world problem or scenario and proposing actionable solutions. For this scholarship interview, the case study might involve addressing societal challenges such as education inequality, environmental issues, technological advancements, or economic development. It requires showcasing your ability to think critically, collaborate effectively, and innovate sustainably.
            </p>
            <ul>
              <li>
                <strong>Provide Training/Workshops:</strong> Focus on skill-building programs tailored to the audience. Highlight examples like coding bootcamps, hands-on AI training, or leadership workshops.
              </li>
              <li>
                <strong>Foster Collaboration:</strong> Partner with governments, NGOs, societies, and international organizations. Leverage these collaborations for funding, resources, and global impact.
              </li>
              <li>
                <strong>Encourage Innovation:</strong> Discuss creative solutions and technologies, emphasizing AI applications like predictive modeling, automation, or personalized learning systems. Mention real-life examples where AI has been used to tackle pressing challenges.
              </li>
              <li>
                <strong>Balance Short-Term and Long-Term Solutions:</strong>
                <ul>
                  <li>Short-term: Quick wins like online webinars or competitions.</li>
                  <li>Long-term: Structured education programs, sustainable partnerships, and infrastructure development.</li>
                </ul>
              </li>
              <li>
                <strong>Promote Education and Engagement:</strong> Take inspiration from initiatives by big companies, e.g., free courses by Google, AI hackathons by Microsoft, or virtual events by IBM. Emphasize global outreach through virtual platforms and competitions.
              </li>
            </ul>
          </Section>

          <Section>
            <h2>Presentation Method</h2>
            <p>
            <strong>When giving your response, follow this structure:</strong>
            </p>
            <ul>
              <li>
              Start with a clear and concise statement about your point.
              </li>
              <li>
              Describe how you propose to address the issue or opportunity.
              </li>
              <li>
              Explain why this approach is effective, citing examples or evidence.
              </li>
              <li>
              Highlight potential outcomes if the strategy is implemented. Contrast with negative  consequences if ignored.
              </li>
              <li>
              Wrap up by reinforcing the importance of the strategy.
              </li>
              <li>
              “That’s all from me. I’ll pass it to the next group member.”
              </li>
            </ul>
          </Section>

          <Section>
            <h2>Case Study 1: Educational Access</h2>
            <p>
              <strong>You are part of a scholarship committee that aims to improve educational access for underprivileged students in rural areas. You have limited resources and need to develop a plan to allocate scholarships effectively.</strong>
            </p>
            <p>
              <strong>How would you design a program to identify eligible students, ensure their continued academic progress, and measure the impact of the scholarships on their lives?</strong>
            </p>
            <p>
              To improve educational access for underprivileged students in rural areas, I would design a comprehensive scholarship program. The program would include a multi-step process starting with a robust selection criteria that identifies students based on their financial needs, academic potential, and commitment to education.
            </p>
            <p>
              Once selected, the program would provide financial support to cover tuition fees, textbooks, and transportation costs. Additionally, mentorship programs and tutoring services would be established to ensure their continued academic progress. Regular monitoring and evaluation of the recipients' performance and feedback from teachers would help identify areas where additional support is needed.
            </p>
            <p>
              To measure the impact of the scholarships, I would collect data on academic performance, graduation rates, and feedback from the scholarship recipients and their families. Surveys and interviews would be conducted to assess the students' perception of the program's effectiveness. Furthermore, regular engagement with the scholarship recipients and their communities would help gather qualitative insights into the broader impact of the scholarships on their lives.
            </p>
          </Section>

          <Section>
            <h2>Case Study 2: Environmental Conservation</h2>
            <p>
              <strong>You are involved in a project that supports students interested in environmental conservation. The team wants to initiate a project that addresses deforestation in a nearby rainforest. How would you assess the feasibility of their project?</strong>
            </p>
            <p>
              <strong>(Hints: including potential challenges and solutions, and how would you evaluate the impact of their efforts on the local community and the environment) This is normally not given during the interview.</strong>
            </p>
            <p>
              To assess the feasibility of the scholarship recipients' project on addressing deforestation, I would first conduct a thorough environmental impact assessment. This assessment would involve identifying the causes and extent of deforestation in the targeted rainforest area, researching existing conservation efforts, and consulting with environmental experts.
            </p>
            <p>
              Challenges such as securing necessary permits, funding, and community cooperation may arise. Solutions could involve collaborating with local environmental organizations and government agencies to obtain support and resources. Engaging the local community through awareness campaigns, and education initiatives, and involving them in the project planning and implementation process could foster cooperation.
            </p>
            <p>
              To evaluate the impact of the project, key metrics such as the area of reforestation, biodiversity restoration, and the reduction in illegal logging activities could be monitored. Additionally, surveys and interviews with the local community and stakeholders would help gauge the project's social impact.
            </p>
          </Section>

          <Section>
            <h2>Case Study 3: Entrepreneurship Development
            </h2>
            <p>
              <strong>As a member of a project committee, you have been tasked with  promoting entrepreneurship among secondary school students. Design a  program that not only supports students' academic pursuits but also  encourages them to develop their entrepreneurial skills.
              </strong>
            </p>
            <p>
              <strong>(Hint: Consider how you would provide mentorship, networking opportunities, and financial  support, as well as how you would measure the success and impact of the program.)
              </strong>
            </p>
            <p>
            To promote entrepreneurship among scholarship recipients, I would establish a multifaceted  program. This program would include mentorship opportunities with successful  entrepreneurs, networking events, business skills training, and access to seed funding.
            </p>
            <p>
            Mentorship would provide guidance, knowledge sharing, and support to help recipients  develop their entrepreneurial ideas. Networking events would connect them with industry  professionals, potential investors, and fellow entrepreneurs. Business skills training would  cover topics like business plan development, financial management, marketing, and pitching.
            </p>
            <p>
            To measure the success of the program, key indicators could include the number of  recipients who start their own businesses, the revenue generated by their ventures, and the  number of jobs created. Tracking the recipients' progress over time through regular
            check-ins and evaluations would provide valuable insights into the program's effectiveness.            </p>
          </Section>
        </>
      )}

      {activeTab === 'appealLetter' && (
        <>
          <Section>
            <h2>Part 2: Appeal Letter Example</h2>
            <p>
              <strong>Tips to increase your chance of appealing:<br/></strong>
              <strong>JPA:</strong> Write in both Malay and English. Refer the sample and shorten it!<br/>
              <strong>Petronas:</strong> State that you can join a second interview if they can offer you.<br/>
              <strong>Yayasan:</strong> Write about the preparation you have done to pursue the course.<br/>
              <strong>Others:</strong> Write about how your passion aligns with the sponsorship bodies’ mission.
            </p>
          </Section>

          <Section>
            <h3>Successful example for 2021 JPA-JKPJ appeals</h3>
            <p><strong>Dear Scholarship Committee,</strong></p>
            <p>
              I hope this letter finds you well. I am writing to appeal for a scholarship opportunity to pursue my tertiary studies in Japan, with the ambitious goal of contributing to Malaysia’s digitalization and economic growth.
            </p>
            <p>
              The fourth industrial revolution (IR 4.0) aims to improve productivity and efficiency throughout the entire organization’s supply chain, and it is denoted by the increasing usage of smart technologies and automations. Several countries, especially Japan, has leaded the world’s development in technological innovations and unsurprisingly, even going beyond with Society 5.0 to embed technological advancement in all layers of its society. As a developing nation, Malaysia has been embracing IR 4.0 and is still emulating leading countries at a humble pace. Thus, I ambitioned to take up the challenge to lead and expedite the growth of Malaysia towards digitalization. Having the opportunity to pursue my tertiary studies in Japan will bring me a step closer in fulfilling my dream; to boost Malaysia’s economic growth through the practical orientation of IR 4.0 and better understanding of Japan’s modus operandi in sustaining their country’s development in technological advancement.
            </p>
            <p>
              Bukan itu sahaja, saya telah menonton banyak video tentang kesukaran semasa melanjutkan pelajaran di Jepun.Namun begitu, saya tidak berasa takut sebaliknya saya berasa sangat teruja kerana terdapat banyak ilmu baharu yang dapat saya terokai dalam dunia baharu ini. Saya juga telah mula belajar bahasa Jepun supaya saya dapat mengadaptasi dengan suasana pembelajaran yang baharu dan tidak menghadapi sebarangan kekangan dalam pemebelajaran .Selain itu,saya juga telah berinteraksi dengan senior yang belajar di Jepun untuk mendapatkan maklumat lebih mendalam yang tidak terdapat dalam media massa dan media sosial. Jadi，saya memang telah bersedia untuk belajar di Jepun. Saya komited bahawa saya dapat mengatasi masalah yang saya hadapi kelak dengan cara yang rasional.
            </p>
            <p>
              Semoga rayuan ini akan mendapat pertimbangan yang telus dan sewajarnya daripada pihak tuan. Segala budi dan jasa baik tuan diucapkan ribuan terima kasih.
            </p>
            <p>
              I am truly grateful for your time and consideration, and I thank you immensely for any support you can provide to help me achieve my dreams and positively impact Malaysia’s digital future.
            </p>
            <p><strong>Sincerely,</strong></p>
            <p><strong>[Your Name]</strong></p>
          </Section>

          <Section>
            <h3>Successful example for 2021 Petronas Malaysia Scholarship appeals</h3>
            <p><strong>Appeal for Petronas Malaysia Scholarship in Accounting</strong></p>
            <p>
              I hope this letter finds you in good health and high spirits. I am writing this appeal with utmost sincerity and enthusiasm to express my unwavering commitment to pursuing a career in accounting and to appeal for the esteemed Petronas Malaysia Scholarship.
            </p>
            <p>
              The world of accounting has always held a special fascination for me. The language of numbers, financial analysis, and meticulous attention to detail have intrigued me from a young age. I am convinced that a career in accounting will not only be personally fulfilling but will also enable me to contribute significantly to the growth and success of Petronas and Malaysia's economic landscape.
            </p>
            <p>
              As a dedicated and passionate student, I have consistently excelled in accounting-related subjects throughout my academic journey. My academic achievements, coupled with my passion for the field, have reinforced my belief that accounting is my calling, and I am eager to contribute my skills to the corporate world.
            </p>
            <p>
              I am fully aware that accounting requires individuals who possess strong analytical skills, ethical integrity, and the ability to make informed financial decisions. Pursuing higher education in accounting will provide me with the necessary knowledge and expertise to navigate the complexities of financial reporting, taxation, and audit practices.
            </p>
            <p>
              Petronas Malaysia's reputation as a global leader in the energy industry deeply resonates with me. The company's commitment to excellence, innovation, and sustainable practices align perfectly with my own values and aspirations. The opportunity to be a recipient of the Petronas Malaysia Scholarship would be a tremendous honour and privilege.
            </p>
            <p>
              I am fully dedicated to upholding Petronas' mission of delivering sustainable value and being a responsible corporate citizen. With the support of the Petronas Malaysia Scholarship, I am determined to excel in my studies and contribute my skills and knowledge to Petronas' continued success.
            </p>
            <p>
              In addition to my academic pursuits, I have actively engaged in extracurricular activities xxxx and community service initiatives. These experiences have instilled in me a sense of responsibility and a commitment to making a positive impact on society.
            </p>
            <p>
              I understand that the competition for the Petronas Malaysia Scholarship is intense, but I am confident that my academic achievements, passion for accounting, and alignment with Petronas' values make me a deserving candidate.
            </p>
            <p>
              In conclusion, I express my sincere gratitude for considering my appeal for the Petronas Malaysia Scholarship in Accounting. The opportunity to be a part of Petronas' legacy and contribute to Malaysia's economic growth would be a dream come true. I am wholeheartedly committed to making the most of this opportunity and fulfilling my aspirations as an accountant.
            </p>
            <p>
              Thank you for your time and consideration. I eagerly await the possibility of becoming a Petronas Malaysia scholar and contributing to Petronas' mission of being a leading energy company for a sustainable future.
            </p>
            <p><strong>Sincerely,</strong></p>
            <p><strong>[Your Name]</strong></p>
          </Section>

          <Section>
            <h3>Successful Example for Yayasan Khazanah  Appeal Letter (Social Sciences)</h3>
            <p>
            <strong>Dear Yayasan Khazanah Malaysia Scholarship Committee,</strong>
            </p>
            <p>
            I hope this letter finds you in good health and high spirits. I am writing this appeal with  utmost sincerity and enthusiasm to express my unwavering commitment to pursuing higher  education in the field of Social Science through the esteemed Yayasan Khazanah Malaysia  Scholarship.
            </p>
            <p>
            Ever since I can remember, I have been deeply fascinated by the complexities of human  behaviour, societies, and the interplay of various social structures. My passion for Social  Science has been the driving force behind my academic pursuits, extracurricular activities,  and community involvement. Aspiring to become a catalyst for positive change and  sustainable development, I strongly believe that a scholarship in [Social Science] from  Yayasan Khazanah Malaysia would be the perfect stepping stone to achieve my goals.
            </p>
            <p>
            Throughout my academic journey, I have demonstrated a keen interest in various subjects  encompassing [Social Science, including Sociology, Psychology, Anthropology, and Political  Science]. I have consistently achieved outstanding academic results in these disciplines,  while also engaging in research projects and participating in inter-school debates and  community outreach programs related to social issues.
            </p>
            <p>
            Moreover, my involvement in volunteer work and community service has provided me with  valuable insights into the challenges faced by marginalised communities. Through these  experiences, I have come to understand the importance of equitable social policies and  sustainable development initiatives that address the needs of the underprivileged. With the  Yayasan Khazanah Malaysia Scholarship, I hope to delve deeper into these areas of study  and contribute my knowledge and skills to creating a more just and compassionate society.
            </p>
            <p>
            Studying Social Science at a renowned institution will provide me with invaluable  opportunities to interact with experts, engage in critical discussions, and collaborate on  research projects. The global exposure offered by Yayasan Khazanah Malaysia’s  scholarship will broaden my horizons and allow me to learn from diverse perspectives and  cultures, enriching my understanding of the world and its intricacies.
            </p>
            <p>
            Additionally, I am fully aware of the scholarship’s emphasis on leadership, integrity, and a  commitment to nation-building. These values resonate deeply with me, and I am determined  to uphold them throughout my academic journey and beyond. I aspire to leverage my  education and knowledge gained through the scholarship to serve my community and  contribute positively to Malaysia’s social development.
            </p>
            <p>
            I sincerely express my gratitude for your time and consideration. The Yayasan Khazanah  Malaysia Scholarship represents a life-changing opportunity for me, enabling me to pursue  my passion for [Social Science] and contribute significantly to society. I assure you of my unwavering dedication to my studies, academic pursuits, and the responsibilities that come  with being a Yayasan Khazanah Malaysia scholar.
            </p>
            <p>
            I understand that the competition for this scholarship is fierce, but I am confident that my  dedication, passion, and academic achievements make me a deserving candidate. I eagerly  await your favorable response and the opportunity to fulfill my dreams and make a  meaningful impact in the field of Social Science.
            </p>
            <p>
            Thank you once again for considering my appeal. I look forward to the possibility of  becoming a Yayasan Khazanah Malaysia scholar and embarking on this transformative  educational journey.
            </p>
            <p><strong>Sincerely,</strong></p>
            <p><strong>[Your Name]</strong></p>
          </Section>

          <Section>
            <h3>Successful Example for 2022 Bank Negara  Malaysia Appeal Letter (Economics)
            </h3>
            <p>
            I hope this letter finds you in good health and high spirits. I am writing this appeal with  genuine enthusiasm and a deep passion for economics and its critical role in shaping  Malaysia’s future monetary policies. I am eager to embark on a journey in economics and  contribute to the country’s sustainable economic growth.
            </p>
            <p>
            From a young age, I have been captivated by the complexities of economics and the  profound influence it has on people’s lives. The interplay between fiscal policies, monetary  measures, and financial stability has intrigued me, inspiring me to pursue higher education in  economics. I am deeply committed to dedicating my career to understanding economic  principles and their practical applications.
            </p>
            <p>
            As an aspiring economist, I firmly believe that economic stability and prudent monetary  policies are the foundation of a prosperous nation. I am driven by a sincere desire to  contribute to the formulation and implementation of policies that will positively impact  Malaysia’s economic well-being and promote inclusive growth.
            </p>
            <p>
            The economic landscape of Malaysia is constantly evolving, influenced by both domestic  and global factors. The recent challenges posed by the pandemic and its impact on the  nation’s economy have only strengthened my resolve to pursue a career in economics. I am  eager to analyze economic data, conduct research, and develop comprehensive economic  models to help navigate through uncertainties and create resilient economic policies for  Malaysia’s future.
            </p>
            <p>
            By studying economics, I will gain the necessary expertise to analyze macroeconomic  indicators, assess monetary policy options, and provide evidence-based recommendations  to support Bank Negara Malaysia’s decisions. I am keen to contribute my skills to help  maintain economic stability, foster sustainable growth, and address socio-economic issues  faced by the nation.
            </p>
            <p>
            The esteemed reputation of Bank Negara Malaysia as a custodian of the country’s economic  welfare deeply resonates with me. I admire the institution’s commitment to maintaining price  stability, promoting financial inclusion, and fostering a conducive economic environment. As  an aspiring economist, the opportunity to work with Bank Negara Malaysia would be an  honor and a privilege.
            </p>
            <p>
            I am fully aware of the rigor and dedication required to excel in the field of economics. My  academic achievements and passion for the subject have prepared me for the challenges  ahead. I have actively engaged in extracurricular activities related to economics, participated  in seminars and workshops, and interned with economic research organizations to gain  practical experience.
            </p>
            <p>
            In conclusion, I express my sincere gratitude for considering my appeal to pursue a career in  economics and contribute to Malaysia’s future monetary policies. The opportunity to work with Bank Negara Malaysia would be a dream come true, and I am committed to upholding  the institution’s values of excellence, integrity, and dedication.
            </p>
            <p>
            Thank you for your time and consideration. I eagerly await the possibility of contributing to  Bank Negara Malaysia’s mission of ensuring economic stability and fostering sustainable  growth for Malaysia’s future.
            </p>
            <p><strong>Sincerely,</strong></p>
            <p><strong>[Your Name]</strong></p>
          </Section>
        </>
      )}
    </ResourceContainer>
  );
};

export default KohHuiXinResourcePack;
