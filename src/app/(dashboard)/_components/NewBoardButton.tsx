'use client';

import useAPiMutation from "@/hooks/useAPiMutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const { mutate, pending } = useAPiMutation(api.board.create)

    const onClick = () => {
        mutate({
            orgId,
            title: "unttled"
        }).then((id) => {
            toast.success("Board created")
        }).catch(() => toast.error('Failed to create board'))
    }

  return (
    <button 
        disabled={pending || disabled}
        onClick={onClick}
        className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6 ", (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed")}
    >
        <div /> 
        <Plus className="w-11 h-11 text-white stroke-1" />
        <p className="text-xs text-white font-light">New Board</p>
    </button>
  )
}

export default NewBoardButton