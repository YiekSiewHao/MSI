import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

const WishesWrapper = styled.div`
  padding: 20px 30px;
  max-width: 1400px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
  }
`;

const WishesHeader = styled.h1`
  font-size: 32px;
  color: #007BFF;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const MotivatingQuote = styled.p`
  font-size: 18px;
  color: #555;
  font-style: italic;
  margin: 0 0 40px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; 
  gap: 60px;
  padding: 30px 0;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    gap: 30px;
    padding: 15px 0;
  }
`;

const Card = styled(motion.div)`
  min-width: 400px;
  max-width: 450px;
  height: 500px;
  background-color: #f9f9f9;
  border-radius: 15px;
  perspective: 1000px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    min-width: 340px;
    height: 450px;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  /* Hover flipping for devices that support hover (e.g. desktop) */
  @media (hover: hover) {
    ${Card}:hover & {
      transform: rotateY(180deg);
    }
  }

  /* When .flipped is applied (on mobile/tap), rotate the card */
  &.flipped {
    transform: rotateY(180deg);
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  object-fit: cover;

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center;
  flex-grow: 1;
  justify-content: center;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Name = styled.h3`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 5px;
  color: #007BFF;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
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

const Scholarship = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const CourseAndUniversity = styled.p`
  font-size: 16px;
  color: #007BFF;
  margin: 5px 0 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
`;

const WishesText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 10px 0 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    margin-top: 8px;
  }
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 20px;
  transform: rotateY(180deg);

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const MotivatingSentence = styled.p`
  font-size: 16px;
  text-align: center;
  padding: 10px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px;
  }
`;

// Create a separate CardItem component
const CardItem = ({ wish, isMobile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    // Toggle flip state on mobile devices (no hover)
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <Card onClick={handleCardClick}>
      <CardInner className={isMobile && isFlipped ? 'flipped' : ''}>
        <CardFront>
          <ProfileImage style={{ backgroundImage: `url(${wish.image})` }} />
          <CardContent>
            <Name>{wish.name}</Name>
            <SocialLinks>
              <a href={wish.instagramLink} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
                {wish.instagram}
              </a>
            </SocialLinks>
            <Scholarship><strong>{wish.scholarship}</strong></Scholarship>
            <CourseAndUniversity>{wish.course}</CourseAndUniversity>
            <WishesText>{wish.wish}</WishesText>
          </CardContent>
        </CardFront>
        <CardBack>
          <MotivatingSentence>{wish.motivatingSentence}</MotivatingSentence>
        </CardBack>
      </CardInner>
    </Card>
  );
};

const Wishes = () => {
  const wishesData = [
    {
      id: 1,
      name: 'Kelvin Ngu',
      course: 'Material Science at Oxford University',
      instagram: '@kelvinnzh',
      instagramLink: 'https://www.instagram.com/kelvinnzh',
      scholarship: 'JPA Scholar',
      wish: 'It’s inspiring to see your work in empowering students to explore opportunities in higher education. Keep up the great work, and may your website guide many students towards brighter futures!',
      image: '/assets/portrait/kelvin_ngu.jpg',
      motivatingSentence: 'You are capable of more than you realise, so don’t be afraid to take that first step. Success begins with courage—if you don’t try, you’ll never know what you can achieve.',
    },
    {
      id: 2,
      name: 'Joel Pang',
      course: 'Chemical Engineering at Caltech',
      instagram: '@joelllpang',
      instagramLink: 'https://www.instagram.com/joelllpang',
      scholarship: 'Shell Scholar',
      wish: 'Your dedication and perseverance are truly commendable. Best of luck in inspiring others to chase their dreams!',
      image: '/assets/portrait/joelpang.jpg',
      motivatingSentence: 'Dream big and dare to fail. Your efforts today will pave the way for a brighter tomorrow.',
    },
    {
      id: 3,
      name: 'Koh Hui Xin',
      course: 'BSc Computer Science at University of Manchester',
      instagram: '@huixinkohh',
      instagramLink: 'https://www.instagram.com/huixinkohh',
      scholarship: 'Bank Negara Malaysia Scholar',
      wish: 'Your vision for the future is inspiring. May you continue to empower others through your initiatives.',
      image: '/assets/portrait/kohhuixinimg.jpg',
      motivatingSentence: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
    },
  ];

  // Check if mobile (no hover)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <WishesWrapper>
      <WishesHeader>Words of Wisdom from Scholars</WishesHeader>
      <MotivatingQuote>Look at the success of our Malaysian scholars</MotivatingQuote>
      <CardContainer>
        {wishesData.map((wish) => (
          <CardItem key={wish.id} wish={wish} isMobile={isMobile} />
        ))}
      </CardContainer>
    </WishesWrapper>
  );
};

export default Wishes;
