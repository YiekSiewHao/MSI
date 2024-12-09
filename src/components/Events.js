import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Import framer-motion

// Define some breakpoints for convenience
const breakpoints = {
  sm: "600px",
  md: "900px",
  lg: "1200px",
};

const EventsWrapper = styled.div`
  padding: 20px 30px;
  max-width: 1400px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: ${breakpoints.lg}) {
    padding: 15px 20px;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 10px 15px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 10px 15px;
  }
`;

const EventsHeader = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: #007bff;
  margin: 0 0 20px;

  @media (max-width: ${breakpoints.sm}) {
    margin-bottom: 15px;
  }
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: ${breakpoints.sm}) {
    gap: 15px;
  }
`;

const ImageCard = styled(motion.div)`
  width: 400px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: ${breakpoints.lg}) {
    width: 300px;
    height: 225px;
  }

  @media (max-width: ${breakpoints.md}) {
    width: 250px;
    height: 180px;
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 90vw; 
    max-width: 350px;
    height: auto;
    aspect-ratio: 4/3; /* Ensures a nice ratio for the image at small screens */
  }
`;

const Modal = styled(motion.div)`
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
  overflow: hidden;
`;

const ModalContent = styled(motion.div)`
  max-width: 80%;
  max-height: 90%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;

  @media (max-width: ${breakpoints.lg}) {
    border-radius: 15px;
  }

  @media (max-width: ${breakpoints.sm}) {
    border-radius: 10px;
    max-width: 95%;
    max-height: 95%;
  }
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

  @media (max-width: ${breakpoints.md}) {
    padding: 10px;
    font-size: 20px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 8px;
    font-size: 18px;
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

  @media (max-width: ${breakpoints.md}) {
    font-size: 30px;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 24px;
  }
`;

const LeftButton = styled(NavigationButton)`
  left: 10px;

  @media (max-width: ${breakpoints.sm}) {
    left: 5px;
  }
`;

const RightButton = styled(NavigationButton)`
  right: 10px;

  @media (max-width: ${breakpoints.sm}) {
    right: 5px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;

  @media (max-width: ${breakpoints.lg}) {
    height: 500px;
  }

  @media (max-width: ${breakpoints.md}) {
    height: 400px;
  }

  @media (max-width: ${breakpoints.sm}) {
    height: 300px;
  }
`;

const EventImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;

  @media (max-width: ${breakpoints.sm}) {
    padding: 5px 10px;
  }
`;

const EventText = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 0;

  @media (max-width: ${breakpoints.md}) {
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 12px;
  }
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
        style={{ width: "100%" }}
      >
        <EventsHeader>Recent Events</EventsHeader>
      </motion.div>

      <GalleryContainer>
        {eventsData.map((event, index) => (
          <ImageCard
            key={event.id}
            style={{ backgroundImage: `url(${event.image})` }}
            onClick={() => handleImageClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
