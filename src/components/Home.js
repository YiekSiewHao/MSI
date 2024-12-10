import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';

// Animation Keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FullWidthContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100); /* Use the custom vh variable */
  min-height: 100vh; /* Ensure the container covers the viewport height */
  position: relative;
  background: radial-gradient(circle, #1a237e, #0d0d0d); /* Space gradient */
  overflow: hidden; /* Prevent content overflow */

  /* Apply specific styling for phones */
  @media (max-width: 768px) {
    height: auto; /* Let height be dictated by content */
    min-height: calc(100vh - env(safe-area-inset-bottom)); /* Account for navigation bar */
  }
`;


const CenteredContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  padding: 0 20px;
  width: 100%;
  max-width: 1200px;
`;

const HomeTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 80px;
  color: #fff; /* Bright white text */
  margin-bottom: 20px;
  font-style: italic;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); /* Darker box shadow for contrast */
  transition: transform 0.3s ease;
  opacity: 0; /* Start hidden */
  animation: ${fadeIn} 1s ease-out 1s forwards; /* Animation starts after 1s */

  &:hover {
    transform: scale(1.05);
    color: #90caf9; /* Light blue on hover */
  }

  @media (max-width: 1200px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const HomeDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  line-height: 1.5;
  color: #fff; /* Bright white for readability */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8); /* Darker box shadow for contrast */
  max-width: 850px;
  margin: 0 auto;
  opacity: 0; /* Start hidden */
  animation: ${fadeIn} 1s ease-out 1.5s forwards; /* Animation starts 1.5s after page load */

  @media (max-width: 1200px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

// Custom Rotating Earth Component
const RotatingEarth = ({ position, scale }) => {
  const { scene } = useGLTF('/assets/little_planet_earth.glb'); // Ensure the model path is correct

  // Rotate the Earth
  useFrame(({ clock }) => {
    scene.rotation.y = clock.getElapsedTime() * 0.1; // Slow rotation
  });

  return <primitive object={scene} position={position} scale={scale} />;
};

const CloudScene = styled(Canvas)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Home = () => {
  const [isLaptopWidth, setIsLaptopWidth] = useState(true);

  useEffect(() => {
    // Set the --vh CSS variable on load and on resize
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    // Check width for interaction removal
    const checkWidth = () => {
      setIsLaptopWidth(window.innerWidth > 1200);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  return (
    <FullWidthContainer>
      {/* 3D Scene */}
      <CloudScene camera={{ position: [0, 0, 15], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Stars in the background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Enlarged Rotating Earth */}
        <RotatingEarth position={[0, -1, -8]} scale={0.017} />

        {/* Only render OrbitControls if screen is wider than 1200px. */}
        {isLaptopWidth && <OrbitControls enableZoom={false} autoRotate={false} />}
      </CloudScene>

      {/* Text Content */}
      <CenteredContent>
        <HomeTitle>Welcome to MSI!</HomeTitle>
        <HomeDescription>
          Malaysian Student Initiative aims to empower students by providing resources, information,
          and opportunities to achieve academic and career success.
        </HomeDescription>
      </CenteredContent>
    </FullWidthContainer>
  );
};

export default Home;
