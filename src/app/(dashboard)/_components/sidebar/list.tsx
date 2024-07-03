'use client'

import { useOrganizationList } from '@clerk/nextjs'
import Item from './item';

const List = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    if (!userMemberships.data?.length) return null;

  return (
    <ul className='space-y-4'>
        {userMemberships.data.map((mem) => (
            <Item 
                key={mem.organization.id} 
                name={mem.organization.name} 
                imageUrl={mem.organization.imageUrl}
                id={mem.organization.id}
            />
        ))}
    </ul>
  )
}

export default List