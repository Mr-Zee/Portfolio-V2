import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function DistortOrb({ dark }) {
  const meshRef = React.useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12;
      meshRef.current.rotation.x = t * 0.06;
    }
  });

  const color = dark ? "#ffffff" : "#0a0a0a"; // orb base
  const emissive = dark ? "#8b5cf6" : "#2563eb"; // glow (purple in dark, blue in light)

  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.35, 128, 128]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.15}
          emissive={new THREE.Color(emissive)}
          emissiveIntensity={0.55}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeHero() {
  const [dark, setDark] = useState(true);

  // Detect theme from <html class="dark">
  useEffect(() => {
    const el = document.documentElement;

    const update = () => setDark(el.classList.contains("dark"));
    update();

    // Observe class changes (theme toggle)
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, []);

  // Meaningful background tint per theme
  const overlayClass = dark
    ? "bg-gradient-to-b from-white/10 via-transparent to-transparent"
    : "bg-gradient-to-b from-black/10 via-transparent to-transparent";

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* subtle gradient overlay so it always “shows up” */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={dark ? 0.6 : 0.8} />
        <directionalLight position={[3, 3, 3]} intensity={dark ? 1.2 : 1.0} />
        <pointLight position={[-3, -2, 2]} intensity={dark ? 0.9 : 0.6} />

        <Suspense fallback={null}>
          {/* Gives it premium lighting */}
          <Environment preset="city" />

          <DistortOrb dark={dark} />

          {/* Sparkles make it visually “alive” */}
          <Sparkles
            count={dark ? 80 : 50}
            size={dark ? 2.2 : 1.6}
            speed={0.35}
            opacity={dark ? 0.35 : 0.25}
            scale={[8, 5, 2]}
            position={[0, 0, 0]}
          />

          {/* Optional: keep disabled in hero (but useful while designing) */}
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
