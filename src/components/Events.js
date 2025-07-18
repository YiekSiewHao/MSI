import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Keyframes for continuous horizontal scrolling
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

// --- DATA STRUCTURE ---
const allEventsData = [
  {
    title: "Physical & Online Events",
    events: [
      { id: 1, image: "/assets/events_images/PhysicalOnline/chs/chsgroupphoto.jpg", text: "Catholic High School, Petaling Jaya" },
      { id: 2, image: "/assets/events_images/PhysicalOnline/SHS/SHS_Photo.jpg", text: "SMK Sacred Heart, Sarawak" },
      { id: 3, image: "/assets/events_images/PhysicalOnline/Puteri/Puteri_Photo.jpg", text: "SMK Seri Puteri, Perak" },
      { id: 4, image: "/assets/events_images/PhysicalOnline/EC/EC_Photo.jpg", text: "English College Johor Bahru" },
      { id: 5, image: "/assets/events_images/PhysicalOnline/MSIxPuGongYing/MSIxPugongying.jpg", text: "MSI x 蒲公英 x 青团运 x 雪隆张氏工会" },
      { id: 6, image: "/assets/events_images/PhysicalOnline/National_Scholarship_Talk/National_Talk.jpg", text: "National Educational Pathways & Scholarship Talk" },
      { id: 19, image: "/assets/events_images/PhysicalOnline/SMKBintulu/SMKbintulu.jpg", text: "SMK Bintulu" },
      { id: 20, image: "/assets/events_images/PhysicalOnline/SMKBintulu/SMKbintulufake.jpg", text: "Johor Tuition Centre" },
    ]
  },
  {
    title: "Community Outreach Programs",
    events: [
      { id: 7, image: "/assets/events_images/Community/Redcrescent1.jpg", text: "Give Hope Now" },
      { id: 8, image: "/assets/events_images/Community/Redcrescent2.jpg", text: "Hope for Sabah & Sarawak" },
      { id: 9, image: "/assets/events_images/Community/Redcrescent3.jpg", text: "Rebuild with Generosity" },
      { id: 10, image: "/assets/events_images/Community/Redcrescent4.png", text: "RM 1,354 Raised!" },
      { id: 11, image: "/assets/events_images/Community/Redcrescent5.png", text: "Why Donate?" },
      { id: 12, image: "/assets/events_images/Community/Redcrescent6.png", text: "Impact of Donation" },
    ]
  },
];

// --- STYLED COMPONENTS ---

const EventsWrapper = styled.section`
  padding: 80px 0;
  background: #ffffff;
  position: relative;
  overflow-x: hidden;
`;

const EventsHeader = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #007bff;
  font-weight: 700;
  margin: 0 0 20px;
  text-align: center;
`;

const SubHeader = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: #555;
  text-align: center;
  margin: 0 auto 60px;
  max-width: 700px;
  line-height: 1.6;
  padding: 0 20px;
`;

const AllRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const RowTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RowTrackWrapper = styled.div`
  position: relative;
  &:nth-of-type(2) { margin-left: -10%; }
`;

const ScrollingTrack = styled.div`
  display: flex;
  width: 333%;
  animation: ${props => (props.direction === 'left' ? scrollLeft : scrollRight)} ${props => props.speed}s linear infinite;
`;

const PolaroidCard = styled(motion.div)`
  width: 250px;
  margin: 0 20px;
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
  &:nth-of-type(4n+1) { transform: rotate(1.5deg); }
  &:nth-of-type(4n+2) { transform: rotate(-2deg); }
  &:nth-of-type(4n+3) { transform: rotate(2.5deg); }
  &:nth-of-type(4n+4) { transform: rotate(-1deg); }
  &:hover {
    transform: scale(1.05) rotate(0deg) !important;
    filter: drop-shadow(0 15px 25px rgba(74, 144, 226, 0.2));
    z-index: 10;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const TextCaption = styled.p`
  font-family: 'Caveat', cursive;
  font-size: 18px;
  color: #333;
  text-align: center;
  line-height: 1.2;
  margin: 0;
`;

// --- MODAL STYLES (UPDATED) ---
const ModalBackdrop = styled(motion.div)`
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 20px;
`;

const ModalContent = styled(motion.div)`
  width: auto;
  height: auto;
  max-width: 95vw;
  max-height: 95vh;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.2); color: white; font-size: 16px; cursor: pointer; z-index: 1002; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover { background: rgba(0, 0, 0, 0.6); transform: scale(1.1); }
`;

// UPDATED: Added responsive styles for the navigation buttons
const ModalNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  padding: 20px 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }

  &.left { left: 20px; }
  &.right { right: 20px; }

  /* Tablet Styles */
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 15px 12px;
  }

  /* Phone Styles */
  @media (max-width: 480px) {
    font-size: 18px;
    padding: 12px 9px;
    &.left { left: 10px; }
    &.right { right: 10px; }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #222;
`;

const ModalImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
`;

const TextContainer = styled.div`
  padding: 15px 30px;
  background: #f1f1f1;
  text-align: center;
  border-top: 1px solid #ddd;
`;

const EventText = styled.p`
  font-size: 16px; color: #333; margin: 0; font-weight: 500;
`;

// --- MAIN COMPONENT ---
const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const flatEvents = allEventsData.flatMap(row => row.events);
  const handleImageClick = (event) => setSelectedEvent(event);
  const handleCloseModal = () => setSelectedEvent(null);
  const handleNav = (direction) => {
    const currentIndex = flatEvents.findIndex(e => e.id === selectedEvent.id);
    const nextIndex = direction === 'next' ? (currentIndex + 1) % flatEvents.length : (currentIndex - 1 + flatEvents.length) % flatEvents.length;
    setSelectedEvent(flatEvents[nextIndex]);
  };
  
  const speeds = [30, 28];
  const directions = ['left', 'right'];

  return (
    <EventsWrapper>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
      <motion.div whileInView={{opacity:1,y:0}} initial={{opacity:0,y:50}} viewport={{once:!0}} transition={{duration:.8,ease:"easeOut"}}>
        <EventsHeader>Photo Gallery</EventsHeader>
        <SubHeader>A visual timeline of our key moments, events, and collaborations that have shaped our mission.</SubHeader>
      </motion.div>
      <AllRowsContainer>
        {allEventsData.map((row, rowIndex) => (
          <div key={rowIndex}>
            <RowTitle>{row.title}</RowTitle>
            <RowTrackWrapper>
              <ScrollingTrack speed={speeds[rowIndex]} direction={directions[rowIndex]}>
                {[...row.events, ...row.events].map((event, eventIndex) => (
                  <PolaroidCard key={`${rowIndex}-${event.id}-${eventIndex}`} onClick={() => handleImageClick(event)}>
                    <Image style={{ backgroundImage: `url(${event.image})` }} />
                    <TextCaption>{event.text}</TextCaption>
                  </PolaroidCard>
                ))}
              </ScrollingTrack>
            </RowTrackWrapper>
          </div>
        ))}
      </AllRowsContainer>
      <AnimatePresence>
        {selectedEvent && (
          <ModalBackdrop initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={handleCloseModal}>
            <ModalContent initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}} transition={{duration:.2}} onClick={e=>e.stopPropagation()}>
              <ImageContainer>
                <ModalImage src={selectedEvent.image} alt={selectedEvent.text} />
                <ModalNavButton className="left" onClick={()=>handleNav("prev")}><FaChevronLeft/></ModalNavButton>
                <ModalNavButton className="right" onClick={()=>handleNav("next")}><FaChevronRight/></ModalNavButton>
              </ImageContainer>
              {selectedEvent.text && (
                <TextContainer>
                  <EventText>{selectedEvent.text}</EventText>
                </TextContainer>
              )}
              <CloseButton onClick={handleCloseModal}><FaTimes/></CloseButton>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </EventsWrapper>
  );
};

export default Events;