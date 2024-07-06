'use client';

import { useState, PointerEvent, useCallback, WheelEvent, useMemo } from 'react'
import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

import { useCanRedo, useCanUndo, useHistory, useSelf, useMutation, useMyPresence, useStorage, useOthersMapped } from '@liveblocks/react/suspense';
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/canvas';
import CursorsPresence from './CursorsPresence';
import { connectionIdToColor, pointerEventToCanvasPoint } from '@/lib/utils';

import {nanoid} from 'nanoid';
import { LiveObject } from '@liveblocks/client';
import LayerPreview from './LayerPreview';
import SelectionBox from './SelectionBox';

interface CanvasProps {
    boardId: string
}

const MAX_LAYERS = 100;

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectange | LayerType.Text | LayerType.Note,
    position: Point 
  ) => {
    const liveLayer = storage.get('layers');
    
    if (liveLayer.size >= MAX_LAYERS) {
      return;
    }

    const liveLayersIds = storage.get('layerIds');
    const layerId = nanoid();
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    });

    liveLayersIds.push(layerId);
    liveLayer.set(layerId, layer);

    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({ mode: CanvasMode.None })
  }, [lastUsedColor]);

  const onWheel = useCallback((e: WheelEvent)=>{
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation((
    { setMyPresence }, 
    e:PointerEvent
  ) => {
    e.preventDefault();

    const current = pointerEventToCanvasPoint(e, camera);
    setMyPresence({ cursor: current })
    // updateMyPresence({ cursor: current });
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerUp = useMutation((
    { setMyPresence },
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);
    console.log(point)

    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point);
    } else {
      setCanvasState({
        mode: CanvasMode.None
      })
    }

    history.resume();
  }, [camera, canvasState, history, insertLayer])

  const selection = useOthersMapped((other) => other.presence.selection);

  const onLayerPointerDown = useMutation((
    {self, setMyPresence},
    e: PointerEvent,
    layerId: string
  ) => {
    if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPoint(e, camera);
    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
    }
    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, [setCanvasState, camera, history, canvasState.mode])

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selection) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selection])
  

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
        <Info boardId={boardId} />
        <Participants />
        <Toolbar 
          canvasState={canvasState} 
          setCanvasState={setCanvasState} 
          undo={history.undo}
          redo={history.redo}
          canUndo={canUndo} 
          canRedo={canRedo}
        />

        <svg 
          onWheel={onWheel} 
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onPointerUp={onPointerUp}
          className='h-[100vh] w-[100vw]'>
          <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)`}}>
            {layerIds.map((layerId) => (
              <LayerPreview 
                key={layerId} 
                id={layerId} 
                onLayerPointerDown={onLayerPointerDown} 
                selectionColor={layerIdsToColorSelection[layerId]} 
              />
            ))}
            <SelectionBox onResizeHandlePointerDown={() => {}} />
            <CursorsPresence />
          </g>
          {/* <g>
            <CursorsPresence />
          </g> */}
        </svg>
    </main>
  )
}

export default Canvas