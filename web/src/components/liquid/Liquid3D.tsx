"use client";

import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, OrbitControls, Float } from "@react-three/drei";

function AnimatedSphere() {

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color="var(--sky-300)"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function Liquid3D() {
  return (
    <div className="w-full h-[400px] bg-sky-50/20 rounded-[3rem] overflow-hidden border border-white/40 shadow-inner">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-sky-500 uppercase tracking-widest pointer-events-none">
        Drag to Orbit 🔄
      </div>
    </div>
  );
}
