import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WishesWrapper = styled.div`
  padding: 20px 30px;
  max-width: 1400px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WishesHeader = styled.h1`
  font-size: 32px;
  color: #007BFF;
  margin: 0; /* Removed upper margin */
`;

const MotivatingQuote = styled.p`
  font-size: 18px;
  color: #555;
  font-style: italic;
  margin: 0 0 40px; /* Removed upper margin */
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto; /* Allow horizontal scrolling if necessary */
  gap: 60px; /* Increased gap between cards */
  padding: 30px 0; /* Adjusted padding for aesthetics */
  scroll-snap-type: x mandatory;
  width: 100%; /* Ensure container spans full width */
  height: 500px; /* Adjusted height for better layout */

  &::-webkit-scrollbar {
    display: none; /* Hide the scrollbar */
  }

  scrollbar-width: none; /* Hide scrollbar for Firefox */
`;

const Card = styled(motion.div)`
  min-width: 400px; /* Adjusted width */
  height: 450px; /* Adjusted height */
  background-color: #f9f9f9;
  border-radius: 15px;
  perspective: 1000px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  scroll-snap-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  ${Card}:hover & {
    transform: rotateY(180deg);
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: rgba(20, 99, 243, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Added for even spacing */
  align-items: center;
  border-radius: 15px;
  padding: 30px 20px; /* Adjusted padding for even top and bottom spacing */
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
`;

const ProfileImage = styled.div`
  width: 120px; /* Increased image size */
  height: 120px; /* Increased image size */
  border-radius: 50%;
  background-color: #ccc;
  margin-bottom: 8px;
`;

const Name = styled.h3`
  font-size: 20px;
  margin-top: 3px;
  margin-bottom: 0px; /* Reduced margin */
`;

const Instagram = styled.p`
  font-size: 16px;
  color: #F9F9F9; /* Instagram brand color */
  margin-top: 0px;
  margin-bottom: 0px; /* Further reduced margin */
`;

const Scholarship = styled.p`
  font-size: 16px;
  color: #FFFFFF; /* White color for visibility */
  margin-top: 4px;
  margin-bottom: 0px; /* Reduced margin */
`;

const CourseAndUniversity = styled.p`
  font-size: 16px;
  color: #FFD700; /* Gold color for visibility */
  margin-top: 4px;
  margin-bottom: 10px; /* Added gap below scholarship */
`;

const WishesText = styled.p`
  font-size: 14px; /* Normal font size */
  color: white;
  text-align: center;
  margin-bottom: 0px;
`;

const MotivatingSentence = styled.p`
  font-size: 16px;
  text-align: center;
  padding: 10px;
`;

const Wishes = () => {
  const wishesData = [
    {
      id: 1,
      name: 'Kelvin Ngu',
      course: 'Material Science at Oxford University',
      instagram: '@kelvinngu',
      scholarship: 'JPA Scholar',
      wish: 'When Adobe identifies unlicensed Adobe apps on your device, it disables them after a brief grace period. Unlicensed apps can have flaws that disrupt it.',
      image: '/assets/portrait/kelvin_ngu.jpg',
      motivatingSentence: 'When Adobe identifies unlicensed Adobe apps on your device, it disables them after a brief grace period. Unlicensed apps can have flaws that disrupt productivity and cause damage to your device.Buy a genuine Adobe app — at a discount — to get the latest features and functionality, including security updates.',
    },
    {
      id: 2,
      name: 'Joel Pang',
      course: 'Chemical Engineering at Caltech',
      instagram: '@joelpang',
      scholarship: 'Shell Scholar',
      wish: 'When Adobe identifies unlicensed Adobe apps on your device, it disables them after a brief grace period. Unlicensed apps can have flaws that disrupt it.',
      image: '/assets/portrait/joelpang.jpg',
      motivatingSentence: 'When Adobe identifies unlicensed Adobe apps on your device, it disables them after a brief grace period. Unlicensed apps can have flaws that disrupt productivity and cause damage to your device.Buy a genuine Adobe app — at a discount — to get the latest features and functionality, including security updates.',
    },
    {
      id: 3,
      name: 'Koh Hui Xin',
      course: 'BSc Computer Science at University of Manchester',
      instagram: '@kohhuixin',
      scholarship: 'Bank Negara Malaysia Scholar',
      wish: 'When Adobe identifies unlicensed Adobe apps on your device, it disables them after a brief grace period. Unlicensed apps can have flaws that disrupt it.',
      image: '/assets/portrait/kohhuixin.jpg',
      motivatingSentence: 'When Adobe identifies unlicensed Adobe apps on your device, it disables them after a brief grace period. Unlicensed apps can have flaws that disrupt productivity and cause damage to your device.Buy a genuine Adobe app — at a discount — to get the latest features and functionality, including security updates.',
    },
  ];

  return (
    <WishesWrapper>
      <WishesHeader>Words of Wisdom from Scholars</WishesHeader>
      <MotivatingQuote>
        Look at the success of our Malaysian scholars
      </MotivatingQuote>
      <CardContainer>
        {wishesData.map((wish) => (
          <Card key={wish.id}>
            <CardInner>
              <CardFront>
                <ProfileImage style={{ backgroundImage: `url(${wish.image})`, backgroundSize: 'cover' }} />
                <Name>{wish.name}</Name>
                <Instagram>{wish.instagram}</Instagram>
                <Scholarship>{wish.scholarship}</Scholarship>
                <CourseAndUniversity>{wish.course}</CourseAndUniversity>
                <WishesText>{wish.wish}</WishesText>
              </CardFront>
              <CardBack>
                <MotivatingSentence>{wish.motivatingSentence}</MotivatingSentence>
              </CardBack>
            </CardInner>
          </Card>
        ))}
      </CardContainer>
    </WishesWrapper>
  );
};

export default Wishes;