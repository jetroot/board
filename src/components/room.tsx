"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: ReactNode
}

export function Room({ 
  children,
  roomId,
  fallback
}: RoomProps ) {
  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider 
        id={roomId} 
        initialStorage={{ 
          layers: new LiveMap<string, LiveObject<Layer>>(), 
          layerIds: new LiveList([]) 
        }} 
        initialPresence={{
          cursor: null,
          selection: []
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}