import React, { useRef, useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ScholarshipList from "./components/ScholarshipList";
import Preparation from "./components/Preparation";
import About from "./components/About";
import Contact from "./components/Contact";
import ScholarshipDetails from "./components/ScholarshipDetails";
import ScholarsStory from "./components/ScholarsStory";
import EssayDetail from "./components/EssayDetail";
import Wishes from "./components/Wishes";
import Events from "./components/Events"; // Import the Events component
import Koh_hui_xin_resource_pack from "./components/Koh_hui_xin_resource_pack"; // Updated import
import "./App.css";

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    /* Your global styles */
  }

  * {
    box-sizing: border-box;
  }
`;

// Transition effect component
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
  const homeRef = useRef(null);
  const scholarshipListRef = useRef(null);
  const contactRef = useRef(null);
  const wishesRef = useRef(null);
  const eventsRef = useRef(null); // Add reference for Events section
  const [showTransition, setShowTransition] = useState(true);

  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GlobalStyle />
      {showTransition && <TransitionEffect onComplete={handleTransitionComplete} />}
      <Header
        onHomeClick={() => scrollToSection(homeRef)}
        onScholarshipListClick={() => scrollToSection(scholarshipListRef)}
        onContactClick={() => scrollToSection(contactRef)}
        onWishesClick={() => scrollToSection(wishesRef)}
        onEventsClick={() => scrollToSection(eventsRef)} // Add navigation for Events
      />
      <main>
        <Routes>
          {/* Main Home Route */}
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
          />
          {/* Other Pages */}
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/about" element={<About />} />
          <Route path="/scholarship-detail/:id" element={<ScholarshipDetails />} />
          <Route path="/scholarship-detail/:id/scholarstories/:scholarName" element={<ScholarsStory />} />
          <Route path="/essay/:id" element={<EssayDetail />} />
          <Route path="/preparation/koh_hui_xin_resource_pack" element={<Koh_hui_xin_resource_pack />} /> {/* Updated route */}
        </Routes>
      </main>
      <Footer /> {/* Ensure the footer is always rendered */}
    </>
  );
};

export default App;
