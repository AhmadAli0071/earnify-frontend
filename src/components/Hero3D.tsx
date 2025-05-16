
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Text } from '@react-three/drei';
import ThreeCanvas from './ThreeCanvas';

function Coin({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Simple animation
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={mesh} 
        position={position as any} 
        rotation={rotation as any} 
        scale={scale}
      >
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial 
          color="#F5D547" 
          metalness={0.8}
          roughness={0.3}
        />
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
          <meshStandardMaterial color="#FFE566" />
        </mesh>
        <mesh position={[0, 0, 0.11]} rotation={[Math.PI/2, 0, 0]}>
          {/* Replace textGeometry with Text from drei */}
          <Text 
            color="#D4AF37"
            fontSize={0.5}
            maxWidth={0.5}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
          >
            $
          </Text>
        </mesh>
      </mesh>
    </Float>
  );
}

function Graph() {
  const mesh = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={mesh} position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Bars */}
      {[...Array(5)].map((_, i) => {
        const height = Math.random() * 1 + 0.5;
        return (
          <mesh key={i} position={[-1.2 + i * 0.6, height/2, 0]}>
            <boxGeometry args={[0.4, height, 0.4]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#0EA5E9" : "#10B981"} 
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
      
      {/* Line graph */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute 
            attach="attributes-position" 
            args={[new Float32Array([-1.4, 0, 0.7, -0.7, 0.8, 0.7, 0, 0.4, 0.7, 0.7, 1.2, 0.7, 1.4, 0.6, 0.7]), 3]} 
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#0EA5E9" linewidth={2} />
      </line>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Coin position={[-2, 0, 0]} scale={0.8} />
      <Coin position={[-1, 1, -1]} rotation={[0, Math.PI/4, 0]} scale={0.6} />
      <Coin position={[1.5, 0.5, -0.5]} rotation={[0, -Math.PI/6, 0]} scale={0.7} />
      <Graph />
    </>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = React.useState(false);

  // This helps with Three.js initialization on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-[400px] w-full">
      {mounted && (
        <ThreeCanvas autoRotate={true}>
          <Hero3DScene />
        </ThreeCanvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-earnify-blue/10 to-earnify-green/10 backdrop-blur-[2px] z-0"></div>
    </div>
  );
}
