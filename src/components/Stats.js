import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView, animate } from "framer-motion";
import { FaUsers, FaYoutube, FaTelegramPlane } from "react-icons/fa";

// The main container for the entire section
const StatsWrapper = styled.section`
  padding: 80px 20px;
  background-color: #ffffff; /* White background */
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #007bff;
  font-weight: 700;
  text-align: center;
  margin: 0 0 15px;
`;

const MainSubHeader = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin: 0 auto 60px;
  max-width: 600px;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch; 
  flex-wrap: wrap;
  gap: 30px; /* Adjusted gap for responsiveness */
  max-width: 1200px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  
  /* --- Responsive Width Control --- */
  flex: 1; /* Allow cards to grow */
  min-width: 280px; /* Minimum width before wrapping */
  max-width: 350px; /* Maximum width on large screens */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 123, 255, 0.15);
  }

  /* Adjust padding for smaller screens */
  @media (max-width: 600px) {
    padding: 25px;
  }
`;

const StatIcon = styled.div`
  font-size: 42px; /* Slightly smaller for better balance */
  color: #007bff;
`;

const StatNumber = styled.p`
  font-size: clamp(2.2rem, 5vw, 3rem); /* Adjusted responsive font size */
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
  min-height: 44px; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SupportText = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-top: 8px;
  line-height: 1.5;
  font-style: italic;
  max-width: 95%;
  flex-grow: 1;
`;

const ChannelLink = styled.a`
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  margin-top: 15px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #007bff;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;

const AnimatedNumber = ({ target }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <motion.span ref={ref}>{value.toLocaleString()}+</motion.span>;
};


const Stats = () => {
  const stats = [
    {
      icon: <FaUsers />,
      number: 3500,
      label: "Total Students Impacted",
      supportText: "Empowering students to discover opportunities for personal and academic growth"
    },
    {
      icon: <FaYoutube style={{color: '#ff0000'}} />,
      number: 2000,
      label: "Youtube Views",
      supportText: "Our YouTube channel is where past events live on — ready for you to watch and stay motivated on your own time",
      link: "https://www.youtube.com/@malaysianstudentinitiative",
      linkLabel: "Our Youtube Channel"
    },
    {
      icon: <FaTelegramPlane />,
      number: 700,
      label: "Telegram Subscribers",
      supportText: "Join our telegram community for the latest updates and support",
      link: "https://t.me/malaysianstudentinitiative",
      linkLabel: "Our Telegram Channel"
    },
  ];

  return (
    <StatsWrapper>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <SectionTitle>Our Impact</SectionTitle>
        <MainSubHeader>In 2025, We have achieved the following milestones:</MainSubHeader>
      </motion.div>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatNumber>
              <AnimatedNumber target={stat.number} />
            </StatNumber>
            <StatLabel>{stat.label}</StatLabel>
            <SupportText>{stat.supportText}</SupportText>
            
            {stat.link && (
              <ChannelLink href={stat.link} target="_blank" rel="noopener noreferrer">
                {stat.linkLabel}
              </ChannelLink>
            )}
          </StatCard>
        ))}
      </StatsGrid>
    </StatsWrapper>
  );
};

export default Stats;