'use client';

import { memo } from 'react'
import { useOthersConnectionIds } from '@liveblocks/react/suspense';
import Cursor from './Cursor';

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map(connectionId => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  )
}

const CursorsPresence = memo(() => {
  return (
    <Cursors />
  )
})

CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence