'use client';

import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import Image from "next/image";
import { api } from "../../../../../convex/_generated/api";
import TabSeperator from "./TabSeperator";
import Link from "next/link";

interface InfoProps {
  boardId: string;
}

const Info = ({
  boardId
}: InfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardId as Id<'boards'>
  });

  if (!data) return <InfoSkeleton />

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Link href={'/'} className="flex">
        <Image src={'/logo.svg'} width={25} height={12} className="w-ful h-ful mr-1" alt="logo" />
        <p className="font-bold text-xl">Board</p>
      </Link>
      <TabSeperator />
      <p className="hover:bg-blue-200 p-1 text-zinc-600 text-sm rounded-md cursor-default">
        {data.title}
      </p>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className='absolute w-[300px] top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md' />
  )
}

export default Info