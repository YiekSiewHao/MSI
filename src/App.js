// src/App.js

import React, { useRef, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Routes, Route,useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ScholarshipList from "./components/ScholarshipList";
import Shortcut from "./components/Shortcut"; // Importing Shortcut
import Preparation from "./components/Preparation";
import About from "./components/About";
import Contact from "./components/Contact";
import ScholarshipDetails from "./components/ScholarshipDetails";
import ScholarsStory from "./components/ScholarsStory";
import EssayDetail from "./components/EssayDetail";
import Wishes from "./components/Wishes";
import Events from "./components/Events";
import Koh_hui_xin_resource_pack from "./components/Koh_hui_xin_resource_pack";
import "./App.css";


const GlobalStyle = createGlobalStyle`
  body {
    /* Your global styles */
  }

  * {
    box-sizing: border-box;
  }
`;

function TransitionEffect({ onComplete }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="transition-overlay">
      <div className="line color1"></div>
      <div className="line color2"></div>
      <div className="line color3"></div>
      <div className="line color4"></div>
    </div>
  );
}

const App = () => {
  const location = useLocation();
  const homeRef = useRef(null);
  const scholarshipListRef = useRef(null);
  const contactRef = useRef(null);
  const wishesRef = useRef(null);
  const eventsRef = useRef(null);
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    if (location.state?.scrollTo === 'scholarshipList' && scholarshipListRef.current) {
      scholarshipListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  // Scroll to a given section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
  
    // Scroll to bottom with smooth animation
    window.scrollTo({ top: scrollHeight - viewportHeight, behavior: "smooth" });
  };


  const [scrollPosition, setScrollPosition] = useState(null);

  return (
    <>
      <GlobalStyle />
      {showTransition && <TransitionEffect onComplete={handleTransitionComplete} />}
      <Header
  onHomeClick={scrollToTop}
  onScholarshipListClick={() => scrollToSection(scholarshipListRef)}
  onContactClick={scrollToBottom} // Updated scrollToBottom function
  onWishesClick={() => scrollToSection(wishesRef)}
  onEventsClick={() => scrollToSection(eventsRef)}
/>
      <main>
        <Routes>
        <Route 
  path="/" 
  element={
    <>
      <section ref={homeRef}>
        <Home />
      </section>
      <section ref={scholarshipListRef}>
        <ScholarshipList />
      </section>
      <section>
        <Shortcut />
      </section>
      <section ref={wishesRef}>
        <Wishes />
      </section>
      <section ref={eventsRef}>
        <Events />
      </section>
      <section ref={contactRef}>
        <Contact />
      </section>
    </>
  } 
  onLoad={() => {
    if (scrollPosition) {
      scholarshipListRef.current.scrollIntoView({ behavior: "smooth" });
      setScrollPosition(null); // Reset after using it
    }
  }}
/>

          <Route path="/preparation" element={<Preparation />} />
          <Route path="/about" element={<About />} />
          <Route path="/scholarship-detail/:id" element={<ScholarshipDetails />} />
          <Route path="/scholarship-detail/:id/scholarstories/:scholarName" element={<ScholarsStory />} />
          <Route path="/essay/:id" element={<EssayDetail />} />
          <Route path="/preparation/koh_hui_xin_resource_pack" element={<Koh_hui_xin_resource_pack />} />
          <Route 
  path="/scholarship-detail/:id" 
  element={<ScholarshipDetails setScrollPosition={setScrollPosition} />} 
/>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
