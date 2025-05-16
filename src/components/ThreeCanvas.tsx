
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

interface ThreeCanvasProps {
  children: React.ReactNode;
  className?: string;
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
}

export default function ThreeCanvas({ 
  children, 
  className = "", 
  autoRotate = false,
  cameraPosition = [0, 0, 5]
}: ThreeCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {children}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 + 0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
