'use client'

import {Plus} from 'lucide-react'
import {CreateOrganization} from '@clerk/nextjs'

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import Hint from '@/components/hint'

const NewButton = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className='aspect-square'>
                <Hint sideOffset={10} side='right' align='start' label='Create Organization'>
                    <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
                    <Plus className='text-white' />
                </button>
                </Hint>
            </div>
        </DialogTrigger>

        <DialogContent className='bg-transparent shadow-none border-none p-0 max-w-fit'>
            <DialogTitle></DialogTitle>
            <CreateOrganization routing='hash' />
        </DialogContent>
    </Dialog>
  )
}

export default NewButton