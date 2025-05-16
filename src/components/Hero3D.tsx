
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';

// Modern coin that spins and glows
function Coin({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Spin animation
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh 
      ref={mesh} 
      position={position as any} 
      rotation={rotation as any} 
      scale={scale}
    >
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshStandardMaterial 
        color="#A78BFA" 
        metalness={0.9}
        roughness={0.1}
        emissive="#4C1D95"
        emissiveIntensity={0.2}
      />
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.05, 32]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.01]} />
        <meshStandardMaterial 
          color="#7C3AED"
          emissive="#4C1D95"
          emissiveIntensity={0.5}
        />
      </mesh>
    </mesh>
  );
}

// Financial data visualization floating platform
function FinancialGraph() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial 
          color="#1E1B4B" 
          metalness={0.5}
          roughness={0.2}
          emissive="#312E81"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Grid lines */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`grid-x-${i}`} position={[-1.6 + i * 0.8, -0.04, 0]} receiveShadow>
          <boxGeometry args={[0.02, 0.02, 2]} />
          <meshStandardMaterial color="#6366F1" opacity={0.5} transparent />
        </mesh>
      ))}
      
      {[...Array(5)].map((_, i) => (
        <mesh key={`grid-z-${i}`} position={[0, -0.04, -0.8 + i * 0.4]} receiveShadow>
          <boxGeometry args={[3.5, 0.02, 0.02]} />
          <meshStandardMaterial color="#6366F1" opacity={0.5} transparent />
        </mesh>
      ))}
      
      {/* Data bars */}
      {[...Array(8)].map((_, i) => {
        const height = 0.3 + Math.sin(i * 0.8) * 0.5 + Math.random() * 0.3;
        const width = 0.25;
        const depth = 0.25;
        
        return (
          <mesh 
            key={`bar-${i}`} 
            position={[-1.5 + i * 0.45, height/2, 0]} 
            castShadow
          >
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#6366F1" : "#2563EB"}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.9}
              emissive={i % 3 === 0 ? "#7C3AED" : i % 3 === 1 ? "#4F46E5" : "#1D4ED8"}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Trend line */}
      <mesh position={[0, 0.2, 0.6]} rotation={[Math.PI/2, 0, 0]}>
        <tubeGeometry 
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-1.5, 0, 0),
              new THREE.Vector3(-1.0, 0, 0.2),
              new THREE.Vector3(-0.5, 0, 0.1),
              new THREE.Vector3(0, 0, 0.4),
              new THREE.Vector3(0.5, 0, 0.3),
              new THREE.Vector3(1.0, 0, 0.5),
              new THREE.Vector3(1.5, 0, 0.8),
            ]), 
            64, 
            0.03, 
            8, 
            false
          ]}
        />
        <meshStandardMaterial 
          color="#10B981" 
          metalness={0.8}
          roughness={0.2}
          emissive="#059669"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

// Flying coins that float around the scene
function FloatingCoins() {
  const coinsData = [
    { pos: [-2, 0.8, -1], scale: 0.4, speed: 1 },
    { pos: [2, 0.5, -0.5], scale: 0.5, speed: 1.3 },
    { pos: [1, 1.2, 0], scale: 0.3, speed: 0.7 },
    { pos: [-1.5, 1.5, -0.7], scale: 0.35, speed: 0.9 },
    { pos: [0, 0.6, 1], scale: 0.45, speed: 1.1 }
  ];

  return (
    <>
      {coinsData.map((coin, i) => (
        <FloatingCoin key={i} position={coin.pos} scale={coin.scale} speed={coin.speed} />
      ))}
    </>
  );
}

function FloatingCoin({ position, scale, speed }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const initialY = position[1];
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Gentle floating motion
      mesh.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.2;
      mesh.current.rotation.y += 0.02 * speed;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <cylinderGeometry args={[1, 1, 0.2, 24]} />
      <meshStandardMaterial 
        color="#F59E0B" 
        metalness={0.9}
        roughness={0.1}
        emissive="#D97706"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Custom camera controller
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);
    
    return () => {};
  }, [camera]);
  
  useFrame(({ clock }) => {
    // Subtle camera movement
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.8;
    camera.position.y = 1.5 + Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main scene component
function HeroScene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#6366F1" />
      
      <FinancialGraph />
      <FloatingCoins />
    </>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);

  // Client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[500px] w-full bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl"></div>
    );
  }

  return (
    <div className="h-[500px] w-full relative overflow-hidden rounded-2xl">
      <Canvas shadows dpr={[1, 2]}>
        <HeroScene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 pointer-events-none"></div>
    </div>
  );
}
