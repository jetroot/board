import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {PointerEvent} from 'react'
import { Camera, Color } from "@/types/canvas";

const COLORS = [
  "#80AF81",
  "#F4CE14",
  "#E68369",
  ""
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(e: PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  }
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`
}