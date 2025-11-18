// src/components/Dock.tsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export function Dock({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      className="flex p-3 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 gap-4"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { mouseX })
      )}
    </motion.div>
  );
}

export function DockIcon({
  children,
  mouseX,
  onClick,
}: {
  children: React.ReactNode;
  mouseX?: any;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const size = useTransform(distance, [-150, 0, 150], [40, 75, 40]);

  const animatedSize = useSpring(size, {
    stiffness: 200,
    damping: 15,
    mass: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: animatedSize, height: animatedSize }}
      className="rounded-full flex items-center justify-center bg-white/10 cursor-pointer"
      onClick={onClick} // ADD THIS
    >
      {children}
    </motion.div>
  );
}
