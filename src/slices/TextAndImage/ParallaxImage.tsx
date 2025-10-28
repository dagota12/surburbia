"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  forgroundImage: ImageField;
  backgroundImage: ImageField;
  className?: string;
};

const ParallaxImage = ({
  forgroundImage,
  backgroundImage,
  className,
}: Props) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const forgroundRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const frameId = requestAnimationFrame(animationFrame);
    function animationFrame() {
      const { x: currX, y: currY } = currRef.current;
      const { x: targetX, y: targetY } = targetPosRef.current;

      const newX = currX + (targetX - currX) * 0.1;
      const newY = currY + (targetY - currY) * 0.1;

      currRef.current = { x: newX, y: newY };
      // console.log(newX, newY);

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
      if (forgroundRef.current) {
        forgroundRef.current.style.transform = `translate(${newX * 2.5}px, ${newY * 2.5}px)`;
      }

      requestAnimationFrame(animationFrame);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2; // Normalize to [-1, 1]
      const y = (event.clientY / innerHeight - 0.5) * 2; // Normalize to [-1, 1]

      targetPosRef.current = { x: x * -20, y: y * -20 };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div
        ref={backgroundRef}
        className="col-start-1 row-start-1 transition-transform"
      >
        <PrismicNextImage field={backgroundImage} alt="" className="w-11/12" />
      </div>
      <div
        ref={forgroundRef}
        className="col-start-1 row-start-1 transition-transform h-full w-full place-items-center"
      >
        <PrismicNextImage
          field={forgroundImage}
          alt=""
          imgixParams={{ height: 600 }}
          className="h-full max-w-[500px] w-auto"
        />
      </div>
    </div>
  );
};

export default ParallaxImage;
