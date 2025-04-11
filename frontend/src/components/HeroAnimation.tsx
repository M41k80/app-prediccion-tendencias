"use client";
import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import { FaSpinner } from "react-icons/fa";

export default function HeroAnimation() {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/lottie/animation.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error("Error loading animation:", err);
        setError("Failed to load animation. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimation();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <p className="text-red-500 text-center max-w-md px-4">{error}</p>
      </div>
    );
  }

  if (!animationData) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-center px-4">
      <Lottie
        options={{
          animationData: animationData,
          loop: true,
          autoplay: true,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            progressiveLoad: true,
          }
        }}
        height="auto"
        width="100%"
        style={{
          maxWidth: 520,
          minHeight: 300,
        }}
        isClickToPauseDisabled={true}
        ariaRole="img"
        ariaLabel="Hero animation"
      />
    </div>
  );
}