import { LayerType } from '@/types/canvas';
import { useStorage } from '@liveblocks/react/suspense';
import React, { memo } from 'react'
import Rectangle from './Rectangle';

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor
}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Rectange:
            return (
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            )
        case LayerType.Note:
            return (
                <div>Note</div>
            )
        case LayerType.Path:
            return (
                <div>Path</div>
            )
        case LayerType.Text:
            return (
                <div>Text</div>
            )
    
        default:
            break;
    }

  return (
    <div>LayerPreview</div>
  )
})

LayerPreview.displayName = "LayerPreview";

export default LayerPreview