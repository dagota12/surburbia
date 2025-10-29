"use client";

import { useEffect, useRef } from "react";

type Props = {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
};

const Slidein = ({ children, delay = 0, duration = 0.6 }: Props) => {
  const eleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!eleRef.current) return;
    const element = eleRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.animation = `slide-in ${duration}s ease ${delay}s forwards`;
        }
      },
      { threshold: 0.2, rootMargin: "-150px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, duration]);
  return (
    <div ref={eleRef} className={`slide-in-hidden`}>
      {children}
    </div>
  );
};

export default Slidein;
