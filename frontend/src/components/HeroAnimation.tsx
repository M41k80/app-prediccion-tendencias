"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function HeroAnimation() {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/lottie/animation.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-full flex justify-center items-center">
      <Lottie
        animationData={animationData}
        loop
        style={{
          width: "100%",
          maxWidth: 520,
          height: "auto",
        }}
      />
    </div>
  );
}
