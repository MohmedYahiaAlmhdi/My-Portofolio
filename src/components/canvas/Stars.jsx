import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random/dist/maath-random.esm";
import { useEffect, useRef, useState } from "react";

// دالة لتخفيف الحركة (Interpolated movement)
function lerp(start, end, t) {
  return start + (end - start) * t;
}

const Stars = (props) => {
  const ref = useRef();

  const count = 500;

  // المواضع الأصلية للنجوم داخل كرة نصف قطرها 1.2
  const [positions] = useState(() =>
    random.inSphere(new Float32Array(count * 3), { radius: 1.2 })
  );

  // المواضع الحالية المتغيرة مع الحركة
  const [currentPositions] = useState(() => new Float32Array(positions.length));
  currentPositions.set(positions);

  const [pairs, setPairs] = useState([]);
  const progressRef = useRef(0);

  // تحديد أزواج التبديل
  useEffect(() => {
    let newPairs = [];
    for (let i = 0; i < count; i += 2) {
      newPairs.push([i, i + 1]);
    }
    setPairs(newPairs);
  }, [count]);

  // التحديث في كل إطار
  useFrame((state, delta) => {
    if (!ref.current) return;

    progressRef.current += delta * 2;

    if (progressRef.current >= 1) {
      // تبادل المواقع الفعلية
      pairs.forEach(([a, b]) => {
        for (let axis = 0; axis < 3; axis++) {
          const idxA = a * 3 + axis;
          const idxB = b * 3 + axis;

          // تبادل المواضع
          let temp = positions[idxA];
          positions[idxA] = positions[idxB];
          positions[idxB] = temp;

          temp = currentPositions[idxA];
          currentPositions[idxA] = currentPositions[idxB];
          currentPositions[idxB] = temp;
        }
      });

      progressRef.current = 0;
      pairs.sort(() => Math.random() - 0.5);
    }

    // تطبيق lerp لتحديث المواقع الحالية
    pairs.forEach(([a, b]) => {
      for (let axis = 0; axis < 3; axis++) {
        const idxA = a * 3 + axis;
        const idxB = b * 3 + axis;

        currentPositions[idxA] = lerp(
          positions[idxA],
          positions[idxB],
          progressRef.current
        );
        currentPositions[idxB] = lerp(
          positions[idxB],
          positions[idxA],
          progressRef.current
        );
      }
    });

    // تحديث نقاط المشهد
    const positionsArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count * 3; i++) {
      positionsArray[i] = currentPositions[i];
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.025}               // حجم محسّن
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 3] }}>  {/* الكاميرا أقرب */}
        <ambientLight intensity={0.3} />
        <Stars />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
