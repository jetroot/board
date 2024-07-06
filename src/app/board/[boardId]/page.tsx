import React from 'react'
import Canvas from './_components/canvas';
import { Room } from '@/components/room';
import CanvasLoading from './_components/CanvasLoading';

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardId = ({
    params
}: BoardIdPageProps) => {

  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}

export default BoardId;