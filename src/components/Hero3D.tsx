
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Coin({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Simple animation
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
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
        color="#9F7AEA" 
        metalness={0.8}
        roughness={0.3}
      />
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshStandardMaterial color="#B794F4" />
      </mesh>
      {/* Simple text representation instead of Text component */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.01]} />
        <meshStandardMaterial color="#805AD5" />
      </mesh>
    </mesh>
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
              color={i % 2 === 0 ? "#805AD5" : "#3182CE"} 
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Hero3DScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Coin position={[-2, 0, 0]} scale={0.8} />
      <Coin position={[-1, 1, -1]} rotation={[0, Math.PI/4, 0]} scale={0.6} />
      <Coin position={[1.5, 0.5, -0.5]} rotation={[0, -Math.PI/6, 0]} scale={0.7} />
      <Graph />
    </>
  );
}

// Custom OrbitControls implementation
function OrbitControlsComponent({ enableZoom = false, autoRotate = false, autoRotateSpeed = 1 }) {
  const { gl, camera } = useThree();
  
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableZoom = enableZoom;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 2 - 0.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.5;
    
    return () => {
      controls.dispose();
    };
  }, [camera, gl, enableZoom, autoRotate, autoRotateSpeed]);
  
  return null;
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);

  // This helps with Three.js initialization on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder or loading state when not mounted
    return <div className="h-[400px] w-full bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>;
  }

  return (
    <div className="h-[400px] w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Hero3DScene />
        <OrbitControlsComponent enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-[1px] z-0"></div>
    </div>
  );
}
