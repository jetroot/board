'use client'

import { OrganizationSwitcher, UserButton, useOrganization } from '@clerk/nextjs'
import SearchInput from './SearchInput';
import InviteButton from './InviteButton';

const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <div className='flex items-center gap-x-4 p-5'>
        <div className='hidden lg:flex lg:flex-1'>
          <SearchInput />
        </div>
        <div className='block lg:hidden flex-1'>
          <OrganizationSwitcher
          appearance={{ 
            elements: {
              rootBox: {
                display: 'flex', 
                width: '100%', 
                justifyContent:'center', 
                alignItems:'center',
                maxWidth: '376px'
              },
              organizationSwitcherTrigger: {
                backgroundColor: 'white',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px'
              }
            } 
          }} 
          hidePersonal 
        />
        </div>

        {organization && <InviteButton />}
        <UserButton />
    </div>
  )
}

export default Navbar