// Frontend/src/components/OrbitalModels.tsx
import React from 'react';
import * as THREE from 'three';

// 1. Define your reusable materials
export const PhaseBlue = () => <meshStandardMaterial color="#60a5fa" roughness={0.3} metalness={0.1} />;
export const PhaseRed = () => <meshStandardMaterial color="#f87171" roughness={0.3} metalness={0.1} />;

// 2. Export your specific orbitals
export const SOrbital = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <PhaseBlue />
  </mesh>
);

export const POrbitalY = () => (
  <group>
    <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.9, 32, 32]} /><PhaseBlue /></mesh>
    <mesh position={[0, -0.8, 0]}><sphereGeometry args={[0.9, 32, 32]} /><PhaseRed /></mesh>
  </group>
);

export const DOrbitalXY = () => (
  <group>
    <mesh position={new THREE.Vector3(0.8, 0.8, 0)}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <PhaseBlue />
    </mesh>
    <mesh position={new THREE.Vector3(-0.8, -0.8, 0)}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <PhaseBlue />
    </mesh>
    <mesh position={new THREE.Vector3(-0.8, 0.8, 0)}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <PhaseRed />
    </mesh>
    <mesh position={new THREE.Vector3(0.8, -0.8, 0)}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <PhaseRed />
    </mesh>
  </group>
);