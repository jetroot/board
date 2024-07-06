import { colorToCss } from '@/lib/utils';
import { RectangeLayer } from '@/types/canvas';
import React from 'react'

interface RectangeProps {
    id: string;
    layer: RectangeLayer,
    onPointerDown: (e: React.PointerEvent, id: string)=>void;
    selectionColor?: string;
}

const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: RectangeProps) => {
    const { fill, height, width, x, y } = layer;
  return (
    <rect 
        className='drop-shadow-md'
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            transform: `translate(${x}px, ${y}px)`
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fill={fill ? colorToCss(fill) : '#ccc'}
        stroke={selectionColor || 'transparent'}
    />
  )
}

export default Rectangle