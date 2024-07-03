'use client';

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useAPiMutation from "@/hooks/useAPiMutation";
import { api } from "../../convex/_generated/api";
import ConfirmModel from "./confirm";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/useRenameModel";

interface ActionsProps {
    children: React.ReactNode;
    side: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    id,
    side,
    sideOffset,
    title
}: ActionsProps) => {
    const { mutate, pending } = useAPiMutation(api.board.remove);
    const { onOpen } = useRenameModal();
    
    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success('Link copied'))
            .catch(() => toast.error('Failed to copy link'))
    }

    const remove = () => {
        mutate({
            id
        }).then((id) => {
            toast.success("Board deleted")
        }).catch(() => toast.error('Failed to delete board'))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e) => {e.stopPropagation()}}>
                <DropdownMenuItem className="cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="w-4 h-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Rename
                </DropdownMenuItem>

                <ConfirmModel
                    header="Delete board?"
                    description="This will delete the board permanently"
                    disabled={pending}
                    onConfirm={remove}
                >
                    <Button variant={'ghost'} className="cursor-pointer text-sm p-3 w-full justify-start font-normal">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}