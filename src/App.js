// src/App.js

import React, { useRef, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ScholarshipList from "./components/ScholarshipList";
import ProgramList from "./components/ProgramList";
import ProgramDetails from "./components/ProgramDetails"; // Ensure this is imported
import ScholarshipDetails from "./components/ScholarshipDetails"; // Ensure this is imported
import Shortcut from "./components/Shortcut";
import Preparation from "./components/Preparation";
import About from "./components/About";
import Contact from "./components/Contact";
import ScholarsStory from "./components/ScholarsStory";
import EssayDetail from "./components/EssayDetail";
import Wishes from "./components/Wishes";
import Events from "./components/Events";
import Koh_hui_xin_resource_pack from "./components/Koh_hui_xin_resource_pack";
import "./App.css";


const GlobalStyle = createGlobalStyle`
  body { /* Add necessary global styles */ margin: 0; font-family: sans-serif; /* Example */ }
  * { box-sizing: border-box; }
`;

// Simple placeholder for TransitionEffect if needed, or remove if not used
function TransitionEffect({ onComplete }) {
    useEffect(() => { onComplete(); }, [onComplete]); // Immediately complete for now
    return null; // Or your actual transition JSX
}

const App = () => {
  const location = useLocation();
  const homeRef = useRef(null);
  const scholarshipListRef = useRef(null);
  const programListRef = useRef(null);
  const contactRef = useRef(null);
  const wishesRef = useRef(null);
  const eventsRef = useRef(null);
  const [showTransition, setShowTransition] = useState(false); // Start false or manage as needed
  const [scrollPosition, setScrollPosition] = useState(null); // For scholarship scroll state

  useEffect(() => {
    // Logic for scrolling based on state (e.g., from back button)
    if (location.state?.scrollTo) {
      let targetRef;
      switch (location.state.scrollTo) {
        case 'scholarshipList': targetRef = scholarshipListRef; break;
        case 'programList': targetRef = programListRef; break;
        // Add other cases if needed
        default: targetRef = null;
      }
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Clear the state after scrolling
        window.history.replaceState({}, document.title)
      }
    }
  }, [location.state]); // Rerun when location state changes

  const handleTransitionComplete = () => setShowTransition(false);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });


  return (
    <>
      <GlobalStyle />
      {showTransition && <TransitionEffect onComplete={handleTransitionComplete} />}
      <Header
        onHomeClick={scrollToTop}
        onScholarshipListClick={() => scrollToSection(scholarshipListRef)}
        onContactClick={scrollToBottom}
        onWishesClick={() => scrollToSection(wishesRef)}
        onEventsClick={() => scrollToSection(eventsRef)}
      />
      <main style={{ minHeight: 'calc(100vh - 160px)' }}> {/* Ensure main takes height */}
        <Routes>
          {/* --- Home Route with multiple sections --- */}
          <Route
            path="/"
            element={
              <>
                <section ref={homeRef}><Home /></section>
                <section ref={scholarshipListRef}><ScholarshipList /></section>
                <section ref={programListRef}><ProgramList /></section>
                <section><Shortcut /></section>
                <section ref={wishesRef}><Wishes /></section>
                <section ref={eventsRef}><Events /></section>
                <section ref={contactRef}><Contact /></section>
              </>
            }
          />

          {/* --- Other Standalone Routes --- */}
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/about" element={<About />} />
          <Route path="/essay/:id" element={<EssayDetail />} />
          <Route path="/preparation/koh_hui_xin_resource_pack" element={<Koh_hui_xin_resource_pack />} />

          {/* --- Scholarship Detail Routes --- */}
           {/* Note: Passing setScrollPosition isn't typical via Route element prop like this */}
           {/* Manage scroll position persistence differently if needed, e.g., using state/context */}
          <Route path="/scholarship-detail/:id" element={<ScholarshipDetails />} />
          <Route path="/scholarship-detail/:id/scholarstories/:scholarName" element={<ScholarsStory />} />

          {/* --- Program Detail Route (Using :programName) --- */}
          <Route path="/program-detail/:programName" element={<ProgramDetails />} />

          {/* Add a catch-all or Not Found route if desired */}
          {/* <Route path="*" element={<NotFoundComponent />} /> */}

        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;