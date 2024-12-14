// src/components/RotatingEarth.js

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { DRACOLoader } from 'three-stdlib';

const RotatingEarth = ({ position, scale }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/assets/little_planet_earth.glb', true, undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); // Path to your DRACO decoder
    loader.setDRACOLoader(dracoLoader);
  });

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1; // Slow rotation
    }
  });

  return <primitive ref={group} object={scene} position={position} scale={scale} />;
};

useGLTF.preload('/assets/little_planet_earth.glb');

export default RotatingEarth;
