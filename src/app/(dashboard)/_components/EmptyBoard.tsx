'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'

import { api } from '../../../../convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import useAPiMutation from '@/hooks/useAPiMutation'
import { toast } from 'sonner'

const EmptyBoard = () => {
    const { organization } = useOrganization()
    const { mutate, pending } = useAPiMutation(api.board.create)

    const onClick = () => {
        if (!organization) return

        mutate({
            orgId: organization?.id,
            title: "unttled"
        }).then((id) => {
            toast.success("Board created")
        }).catch(() => toast.error('Failed to create board'))
    }

    return (
    <div className='h-full flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-semibold mt-6'>Create your first board</h2>
        <p className='text-muted-foreground text-sm mt-2'>
            start by creating your first board
        </p>
        <div className='mt-6'>
            <Button disabled={pending} onClick={onClick} size={'lg'}>
                Create board
            </Button>
        </div>
    </div>
  )
}

export default EmptyBoard