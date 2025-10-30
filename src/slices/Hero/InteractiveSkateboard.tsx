"use client";
import { Skateboard } from "@/components/Skateboard";

import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import gsap from "gsap";
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
  const containerRef = useRef<THREE.Group>(null);

  const jumpBoard = (board: THREE.Group) => {
    //jump
    gsap
      .timeline()
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: "power2.out",
        delay: 0.26,
      })
      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: "power2.in",
      });
  };
  const allie = (board: THREE.Group) => {
    //tilt
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "ease",
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    const board = containerRef.current;
    if (!board) return;
    const { name } = e.object;

    jumpBoard(board); //jump
    if (name === "back") {
      allie(board);
    }
    console.log("Clicked on:", name);
  };
  return (
    <group>
      <pointLight position={[1, 1, 1]} intensity={2} />
      <Environment
        preset="studio" // Can be .hdr or .exr
        background={false} // If true, sets scene background
        files={"hdr/warehouse-256.hdr"}
      />
      <group ref={containerRef} position={[-0.25, -0.086, -0.635]}>
        <group position={[0, -0.086, 0.635]}>
          <Skateboard
            deckTextureURLs={[deckTextureURL]}
            deckTextureURL={deckTextureURL}
            wheelTextureURLs={[wheelTextureURL]}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
            // constantWheelSpin
          />
          <mesh position={[0, 0.27, 0]} name="middle" onClick={handleClick}>
            <boxGeometry args={[0.6, 0.1, 2.2]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      </group>

      <OrbitControls />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}

export default InteractiveSkateboard;
