"use client";
import { Skateboard } from "@/components/Skateboard";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

const InteractiveSkateboard = ({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <Canvas
        className="min-h-240 w-full"
        camera={{
          position: [1.5, 1, 1.4],
          fov: 54,
        }}
      >
        <Suspense>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Model({ path }: { path: string }) {
  const gltf = useGLTF(path);

  return <primitive object={gltf.scene} dispose={null} />;
}

type SceneProps = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: SceneProps) {
  return (
    <group>
      <pointLight position={[1, 1, 1]} intensity={2} />
      <Environment
        preset="studio" // Can be .hdr or .exr
        background={false} // If true, sets scene background
        files={"hdr/warehouse-256.hdr"}
      />
      {/* <Model path="skateboard.gltf" /> */}
      <Skateboard
        deckTextureURLs={[deckTextureURL]}
        deckTextureURL={deckTextureURL}
        wheelTextureURLs={[wheelTextureURL]}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
        constantWheelSpin
      />
      <OrbitControls />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}

export default InteractiveSkateboard;
