import type { CSSProperties } from "react";

// x/y = focal point in % (object-position), zoom = scale around that point (1 = cover).
export type Frame = { x: number; y: number; zoom: number };

export const DEFAULT_FRAME: Frame = { x: 50, y: 50, zoom: 1 };

export function frameStyle(f?: Partial<Frame> | null): CSSProperties {
  const { x, y, zoom } = { ...DEFAULT_FRAME, ...f };
  return {
    objectFit: "cover",
    objectPosition: `${x}% ${y}%`,
    transform: zoom === 1 ? undefined : `scale(${zoom})`,
    transformOrigin: `${x}% ${y}%`,
  };
}
