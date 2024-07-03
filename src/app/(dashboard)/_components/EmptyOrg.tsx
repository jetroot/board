import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import React from 'react'

const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <h1 className='text-2xl'>Welcome to Board</h1>
        <p className='text-muted-foreground mt-2'>
          Create organization to get started
        </p>

        <div className='mt-6'>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={'lg'}>
                Create an organization
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateOrganization routing='hash' appearance={{
                elements: {
                  cardBox: {
                    boxShadow: 'none',
                    backgroundColor: 'white'
                  },
                  footer: {
                    "div": {
                      backgroundColor: 'white',
                    }
                    
                  },
                }
              }} />
            </DialogContent>
          </Dialog>
        </div>
    </div>
  )
}

export default EmptyOrg