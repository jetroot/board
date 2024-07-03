import { useRenameModal } from '@/store/useRenameModel'
import { Dialog } from '@radix-ui/react-dialog'
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useAPiMutation from '@/hooks/useAPiMutation'
import { api } from '../../../convex/_generated/api'
import { toast } from 'sonner'

const RenameModal = () => {
    const {
        isOpen,
        initialValues,
        onClose,
        onOpen
    } = useRenameModal()
    const [title, setTitle] = useState(initialValues.title);

    const {mutate, pending} = useAPiMutation(api.board.update);

    useEffect(() => {
      setTitle(initialValues.title)
    }, [initialValues.title])
    

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        mutate({
            id: initialValues.id,
            title
        }).then(() => {
            toast.success("Board title updated")
            onClose();
        }).catch(() => toast.error('Failed to update board title'))
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit board title
                </DialogTitle>
            </DialogHeader>

            <DialogDescription>
                Enter a new title for this board
            </DialogDescription>
            <form onSubmit={onSubmit} className='space-y-4'>
                <Input 
                    disabled={pending}
                    required 
                    maxLength={60} 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value) } 
                    placeholder='Board title' 
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant={'outline'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type='submit' disabled={pending}>
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default RenameModal