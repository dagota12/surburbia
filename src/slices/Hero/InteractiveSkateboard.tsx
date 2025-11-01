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
import { Suspense, useRef, useState } from "react";

import gsap from "gsap";
import Hotspot from "./Hotspot";
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
        <Suspense fallback={null}>
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
  const originRef = useRef<THREE.Group>(null);

  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  });
  const [animating, setAnimating] = useState(false);

  const jumpBoard = (board: THREE.Group) => {
    setAnimating(true);
    //jump
    gsap
      .timeline({
        onComplete: () => setAnimating(false),
      })
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

  const kickflip = (board: THREE.Group) => {
    // jumpBoard(board);

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
        ease: "power2.in",
      })
      .to(
        board.rotation,
        {
          z: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: "none",
        },
        ".3"
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  };
  const frontside360 = (board: THREE.Group, origin: THREE.Group) => {
    // jumpBoard(board);

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
        ease: "power2.in",
      })
      .to(
        origin.rotation,
        {
          y: `+=${Math.PI * 2}`,
          duration: 0.77,
          ease: "none",
        },
        ".33"
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.14,
        ease: "none",
      });
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    const board = containerRef.current;
    const origin = originRef.current;
    if (!board || !origin || animating) return;
    const { name } = e.object;

    setShowHotspot((curr) => ({ ...curr, [name]: false }));

    jumpBoard(board); //jump
    if (name === "back") {
      allie(board);
    } else if (name === "middle") {
      kickflip(board);
    } else if (name === "front") {
      frontside360(board, origin);
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
      <group ref={originRef}>
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
            <Hotspot
              isVisible={!animating && showHotspot.front}
              position={[0, 0.38, 1]}
              color="#88fc39"
            />

            {/* front board control */}
            <mesh position={[0, 0.27, 0.9]} name="front" onClick={handleClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial color={"white"} visible={false} />
            </mesh>
            <Hotspot
              isVisible={!animating && showHotspot.middle}
              position={[0, 0.33, 0]}
              color="#ff7a51"
            />
            {/* middle board control */}
            <mesh position={[0, 0.27, 0]} name="middle" onClick={handleClick}>
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={!animating && showHotspot.back}
              position={[0, 0.35, -0.9]}
              color="#46acfa"
            />
            {/* back board control */}
            <mesh position={[0, 0.27, -0.9]} name="back" onClick={handleClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial color={"white"} visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <OrbitControls />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}

export default InteractiveSkateboard;
