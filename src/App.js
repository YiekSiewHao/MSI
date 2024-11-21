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
import ScholarsStory from "./components/ScholarsStory"; // Import the ScholarsStory component
import EssayDetail from "./components/EssayDetail";
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
      />
      <Routes>
        {/* Main Home Route */}
        <Route
          path="/"
          element={
            <>
              <main>
                <section ref={homeRef}>
                  <Home />
                </section>
                <section ref={scholarshipListRef}>
                  <ScholarshipList />
                </section>
                <section ref={contactRef}>
                  <Contact />
                </section>
              </main>
              <Footer />
            </>
          }
        />
        {/* Other Pages */}
        <Route path="/preparation" element={<Preparation />} />
        <Route path="/about" element={<About />} />
        <Route path="/scholarship-detail/:id" element={<ScholarshipDetails />} />
        {/* Add the missing route for ScholarsStory */}
        <Route path="/scholarship-detail/:id/scholarstories/:scholarName" element={<ScholarsStory />} />
        {/* EssayDetail Page */}
        <Route path="/essay/:id" element={<EssayDetail />} />
      </Routes>
    </>
  );
};

export default App;
