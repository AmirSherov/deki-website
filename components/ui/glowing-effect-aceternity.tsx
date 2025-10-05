"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
}

const GlowingEffectAceternity = memo(
  ({
    proximity = 64,
    glow = true,
    className,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [mouseAngle, setMouseAngle] = useState(0);
    const [glowIntensity, setGlowIntensity] = useState(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Check if mouse is within proximity
      const isNear = 
        e.clientX >= rect.left - proximity &&
        e.clientX <= rect.right + proximity &&
        e.clientY >= rect.top - proximity &&
        e.clientY <= rect.bottom + proximity;

      setIsActive(isNear);
      
      if (isNear) {
        // Calculate angle from center to mouse
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
        setMouseAngle(angle);
        
        // Calculate distance for glow intensity
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(rect.width / 2 + proximity, 2) + Math.pow(rect.height / 2 + proximity, 2));
        const intensity = Math.max(0, 1 - (distance / maxDistance));
        setGlowIntensity(intensity);
      } else {
        setGlowIntensity(0);
      }
    }, [proximity]);

    useEffect(() => {
      if (disabled) return;

      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [handleMouseMove, disabled]);

    if (disabled) return null;

    return (
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          className
        )}
      >
        {/* Animated gradient border */}
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] p-[1px] transition-opacity duration-300",
            isActive ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: `conic-gradient(from ${mouseAngle}deg at 50% 50%, 
              #ff6b6b 0deg, 
              #4ecdc4 72deg, 
              #45b7d1 144deg, 
              #96ceb4 216deg, 
              #feca57 288deg, 
              #ff6b6b 360deg)`,
          }}
        >
          {/* Inner content area */}
          <div className="h-full w-full rounded-[inherit] bg-black" />
        </div>
        
        {/* Cursor following glow effect */}
        {glow && (
          <div
            className="absolute inset-0 rounded-[inherit] transition-opacity duration-200"
            style={{
              opacity: glowIntensity * 0.6,
              background: `conic-gradient(from ${mouseAngle}deg at 50% 50%, 
                rgba(255, 107, 107, ${0.3 * glowIntensity}) 0deg, 
                rgba(78, 205, 196, ${0.3 * glowIntensity}) 72deg, 
                rgba(69, 183, 209, ${0.3 * glowIntensity}) 144deg, 
                rgba(150, 206, 180, ${0.3 * glowIntensity}) 216deg, 
                rgba(254, 202, 87, ${0.3 * glowIntensity}) 288deg, 
                rgba(255, 107, 107, ${0.3 * glowIntensity}) 360deg)`,
              filter: `blur(${6 + glowIntensity * 4}px)`,
            }}
          />
        )}
      </div>
    );
  }
);

GlowingEffectAceternity.displayName = "GlowingEffectAceternity";

export { GlowingEffectAceternity };
