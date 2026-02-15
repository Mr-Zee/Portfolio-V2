import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";

function Blob() {
  return (
    <Float speed={1.2} rotationIntensity={0.9} floatIntensity={0.9}>
      <Icosahedron args={[1.4, 1]}>
        <meshStandardMaterial roughness={0.35} metalness={0.15} />
      </Icosahedron>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-35">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.1} />
        <Suspense fallback={null}>
          <Blob />
        </Suspense>
      </Canvas>
    </div>
  );
}
