import React from 'react';
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(circle, #1a237e, #0d0d0d); /* Space gradient */
`;

const CenteredContent = styled.div`
  position: absolute;
  text-align: center;
  z-index: 1;
`;

const HomeTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 100px;
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
`;

const HomeDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  line-height: 1.5;
  color: #fff; /* Light gray for readability */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8); /* Darker box shadow for contrast */
  max-width: 850px;
  margin: 0 auto;
  opacity: 0; /* Start hidden */
  animation: ${fadeIn} 1s ease-out 1.5s forwards; /* Animation starts 1.5s after page load */
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

const CloudScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Stars in the background */}
      <Stars
        radius={100} // Larger radius for a distant starfield
        depth={50} // Depth of starfield
        count={5000} // Number of stars
        factor={4} // Star size factor
        saturation={0} // Neutral color tone
        fade
      />

      {/* Enlarged Rotating Earth */}
      <RotatingEarth position={[0, -1, -8]} scale={0.017} />

      {/* Controls for 3D view */}
      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  );
};

const Home = () => {
  return (
    <FullWidthContainer>
      {/* 3D Scene */}
      <CloudScene />

      {/* Text Content */}
      <CenteredContent>
        <HomeTitle>Welcome to MSI!</HomeTitle>
        <HomeDescription>
          Malaysian Student Initiative aims to empower students by providing resources, information, and opportunities to achieve academic and career success.
        </HomeDescription>
      </CenteredContent>
    </FullWidthContainer>
  );
};

export default Home;
