'use client'

import {
    useOrganization,
    useOrganizationList
} from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import Image from 'next/image';
import Hint from '@/components/hint';

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string
}

const Item = ({id, imageUrl, name}: ItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList()
    const isActive = organization?.id === id;
    
    const onClick = () => {
        // if (!isActive) return;
        setActive({ organization: id })
    }

    return (
    <div className='aspect-square relative'>
        <Hint label={name} align='start' side='right' sideOffset={10}>
            <Image 
            src={imageUrl}
            alt={name}
            onClick={onClick}
            fill
            className={cn(
                "rounded-md cursor-pointer opacity-50 hover:opacity-100 transition",
                isActive && "opacity-100"
            )}
        />
        </Hint>
    </div>
  )
}

export default Item