import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ scale }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.25} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={scale}
        position={[0, -3, -1.5]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const calculatedScale = Math.min(Math.max(width / 1000, 0.6), 1.5);
      setScale(calculatedScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      camera={{ fov: 35, near: 0.1, far: 200, position: [20, 3, 5] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers scale={scale} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
