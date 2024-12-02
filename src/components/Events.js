import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Import framer-motion

const EventsWrapper = styled.div`
  padding: 20px 30px;
  max-width: 1400px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EventsHeader = styled.h1`
  font-size: 32px;
  color: #007bff;
  margin: 0 0 20px;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ImageCard = styled(motion.div)` // Use motion.div for animation
  width: 400px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Modal = styled(motion.div)` // Use motion.div for animation
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden; /* Prevent content overflow */
`;

const ModalContent = styled(motion.div)` // Use motion.div for animation
  max-width: 80%;
  max-height: 90%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative; // Add position relative for the CloseButton
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  padding: 15px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    background: #0056b3;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 36px;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    color: #007bff;
  }
`;

const LeftButton = styled(NavigationButton)`
  left: 10px;
`;

const RightButton = styled(NavigationButton)`
  right: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 700px; /* Set a fixed height for the image container */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4; /* Light background for better visibility */
`;

const EventImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures the image fits well within the container */
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const EventText = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 0;
`;

const Events = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const eventsData = [
    {
      id: 1,
      image: "assets/events_images/chs/chszacpicture.jpg",
      text: "Catholic High School - Presentation",
    },
    {
      id: 2,
      image: "/assets/events_images/chs/chsgroupphoto.jpg",
      text: "Thank you Catholic High School!",
    },
    {
      id: 3,
      image: "/assets/events_images/chs/qnasession.jpg",
      text: "Q&A Session",
    },
    {
      id: 4,
      image: "/assets/events_images/chs/thechsteam.jpg",
      text: "Group Photo - Yiek, Zac, Sheng Ze, Jordan",
    },
    {
      id: 5,
      image: "/assets/events_images/chs/chsgroup.jpg",
      text: "Receiving awards from CHS",
    },
  ];

  const handleImageClick = (index) => {
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  const handlePrevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? eventsData.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === eventsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <EventsWrapper>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ width: "100%" }} // Ensures the motion.div takes full width
      >
        <EventsHeader>Recent Events</EventsHeader>
      </motion.div>

      <GalleryContainer>
        {eventsData.map((event, index) => (
          <ImageCard
            key={event.id}
            style={{ backgroundImage: `url(${event.image})` }}
            onClick={() => handleImageClick(index)}
            whileHover={{ scale: 1.05 }} // Animation on hover
            whileTap={{ scale: 0.95 }} // Animation on tap
            whileInView={{ opacity: 1, y: 0 }} // Animate when in view
            initial={{ opacity: 0, y: 30 }} // Initial state
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
          />
        ))}
      </GalleryContainer>

      {selectedIndex !== null && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={handleCloseModal}>
              <FaTimes />
            </CloseButton>
            <LeftButton onClick={handlePrevImage}>
              <FaChevronLeft />
            </LeftButton>
            <ImageContainer>
              <EventImage
                src={eventsData[selectedIndex].image}
                alt="Event"
              />
            </ImageContainer>
            <TextContainer>
              <EventText>{eventsData[selectedIndex].text}</EventText>
            </TextContainer>
            <RightButton onClick={handleNextImage}>
              <FaChevronRight />
            </RightButton>
          </ModalContent>
        </Modal>
      )}
    </EventsWrapper>
  );
};

export default Events;
