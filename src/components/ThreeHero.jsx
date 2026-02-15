import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, Text, Sparkles  } from "@react-three/drei";
import * as THREE from "three";

/** Detect <html class="dark"> changes */
function useDarkMode() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();

    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return dark;
}

/** Small helper: clamp */
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function UIPanel({ dark, position = [0, 0, 0], rotation = [0, 0, 0], title, kind }) {
  // Materials
  const glassMat = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: dark ? 0.22 : 0.28,
      roughness: 0.25,
      metalness: 0.05,
      transmission: 0.35,
      thickness: 0.7,
      ior: 1.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.22
    });
    mat.color = new THREE.Color(dark ? "#ffffff" : "#0a0a0a");
    return mat;
  }, [dark]);

  const borderMat = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: dark ? 0.35 : 0.22,
      roughness: 0.7,
      metalness: 0.0
    });
    mat.color = new THREE.Color(dark ? "#a1a1aa" : "#111827");
    return mat;
  }, [dark]);

  // Accent colors (dashboard feel)
  const accent = dark ? "#8b5cf6" : "#2563eb"; 
  const accent2 = dark ? "#22c55e" : "#16a34a"; 
  const muted = dark ? "#d4d4d8" : "#111827";

  return (
    <group position={position} rotation={rotation}>
      {/* Card body */}
      <RoundedBox args={[2.35, 1.45, 0.08]} radius={0.12} smoothness={6} material={glassMat} />

      {/* Thin border */}
      <RoundedBox
        args={[2.38, 1.48, 0.02]}
        radius={0.12}
        smoothness={6}
        position={[0, 0, 0.05]}
        material={borderMat}
      />

      {/* Title */}
      <Text
        position={[-1.05, 0.56, 0.09]}
        fontSize={0.12}
        anchorX="left"
        anchorY="middle"
        color={muted}
      >
        {title}
      </Text>

      {/* Content variants */}
      {kind === "kpi" ? (
        <group>
          <Text position={[-1.05, 0.18, 0.09]} fontSize={0.28} anchorX="left" color={muted}>
            2.4k
          </Text>
          <Text position={[-1.05, -0.08, 0.09]} fontSize={0.11} anchorX="left" color={dark ? "#a1a1aa" : "#374151"}>
            Weekly Active
          </Text>

          {/* progress bar */}
          <mesh position={[0.15, -0.42, 0.09]}>
            <boxGeometry args={[1.6, 0.08, 0.02]} />
            <meshStandardMaterial color={dark ? "#27272a" : "#e5e7eb"} />
          </mesh>
          <mesh position={[-0.2, -0.42, 0.1]}>
            <boxGeometry args={[0.9, 0.08, 0.03]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.25} />
          </mesh>
        </group>
      ) : null}

      {kind === "chart" ? (
        <group>
          {/* chart lines */}
          <mesh position={[0, -0.05, 0.09]}>
            <boxGeometry args={[2.05, 0.7, 0.02]} />
            <meshStandardMaterial transparent opacity={0.0} />
          </mesh>

          {/* bars */}
          {Array.from({ length: 7 }).map((_, i) => {
            const h = 0.15 + (i % 3) * 0.12 + (i === 5 ? 0.28 : 0);
            return (
              <mesh key={i} position={[-0.9 + i * 0.3, -0.35 + h / 2, 0.1]}>
                <boxGeometry args={[0.16, h, 0.05]} />
                <meshStandardMaterial
                  color={i === 5 ? accent : dark ? "#3f3f46" : "#cbd5e1"}
                  emissive={i === 5 ? accent : "#000000"}
                  emissiveIntensity={i === 5 ? 0.25 : 0}
                />
              </mesh>
            );
          })}

          {/* trend chip */}
          <mesh position={[0.78, 0.38, 0.1]}>
            <boxGeometry args={[0.48, 0.18, 0.04]} />
            <meshStandardMaterial color={dark ? "#1f2937" : "#e2e8f0"} />
          </mesh>
          <Text position={[0.6, 0.38, 0.12]} fontSize={0.10} anchorX="left" color={accent2}>
            +12%
          </Text>
        </group>
      ) : null}

      {kind === "list" ? (
        <group>
          {/* list rows */}
          {Array.from({ length: 4 }).map((_, i) => (
            <group key={i} position={[-0.95, 0.25 - i * 0.28, 0.1]}>
              <mesh position={[0.12, 0, 0]}>
                <boxGeometry args={[1.6, 0.08, 0.03]} />
                <meshStandardMaterial color={dark ? "#3f3f46" : "#cbd5e1"} transparent opacity={0.65} />
              </mesh>
              <mesh position={[-0.55, 0, 0]}>
                <boxGeometry args={[0.16, 0.16, 0.04]} />
                <meshStandardMaterial color={i === 1 ? accent : dark ? "#27272a" : "#e5e7eb"} />
              </mesh>
            </group>
          ))}

          {/* small badge */}
          <mesh position={[0.82, -0.45, 0.1]}>
            <boxGeometry args={[0.58, 0.2, 0.04]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
          </mesh>
          <Text position={[0.56, -0.45, 0.12]} fontSize={0.095} anchorX="left" color="#ffffff">
            View All
          </Text>
        </group>
      ) : null}
    </group>
  );
}

function Scene() {
  const dark = useDarkMode();

  const rig = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.x = clamp(x, -1, 1);
      mouse.current.y = clamp(y, -1, 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!rig.current) return;
    // subtle parallax tilt
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, mouse.current.x * 0.15, 0.05);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -mouse.current.y * 0.10, 0.05);
  });

  return (
    <group ref={rig} position={[3, -0.7, 0]}>
      <ambientLight intensity={dark ? 0.7 : 0.85} />
      <directionalLight position={[4, 4, 4]} intensity={dark ? 1.2 : 1.0} />
      <pointLight position={[-4, -2, 2]} intensity={dark ? 0.8 : 0.55} />

      <Suspense fallback={null}>
        <Environment preset="city" />

        {/* Three floating cards */}
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.55}>
          <UIPanel dark={dark} title="KPI Snapshot" kind="kpi" position={[-1.6, 0.2, 0]} rotation={[0, 0.22, 0]} />
        </Float>

        <Float speed={1.0} rotationIntensity={0.22} floatIntensity={0.5}>
          <UIPanel dark={dark} title="Engagement" kind="chart" position={[0.2, -0.1, 0.4]} rotation={[0, -0.12, 0]} />
        </Float>

        <Float speed={1.05} rotationIntensity={0.2} floatIntensity={0.55}>
          <UIPanel dark={dark} title="Tasks" kind="list" position={[1.65, 0.15, -0.2]} rotation={[0, -0.22, 0]} />
        </Float>

         <Sparkles
            count={dark ? 80 : 50}
            size={dark ? 2.2 : 1.6}
            speed={0.35}
            opacity={dark ? 0.35 : 0.25}
            scale={[8, 5, 2]}
            position={[0, 0, 0]}
          />
      </Suspense>
    </group>
  );
}

export default function ThreeHero() {
  const dark = useDarkMode();

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Soft overlay so it always looks good behind hero text */}
      <div
        className={[
          "absolute inset-0",
          dark
            ? "bg-gradient-to-b from-white/10 via-transparent to-transparent"
            : "bg-gradient-to-b from-black/10 via-transparent to-transparent"
        ].join(" ")}
      />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
