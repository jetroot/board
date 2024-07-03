'use client'

import { Poppins } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[200px] pl-5 pt-5 '>
        <Link href={'/'}>
          <div className="flex gap-x-2 items-center">
            <Image 
              src='/logo.svg'
              height={60}
              width={25}
              alt="logo"
            />
            <span className={cn('font-semibold text-2xl', font.className)}>Board</span>
          </div>
        </Link>

        <OrganizationSwitcher 
          appearance={{ 
            elements: {
              rootBox: {
                display: 'flex', 
                width: '100%', 
                justifyContent:'center', alignItems:'center'
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

        <div className="space-y-1 w-full">
          <Button 
            asChild size={'lg'} 
            className="font-normal justify-start px-2 w-full" 
            variant={favorites ? "ghost" : "secondary"}>
            <Link href={'/'}>
              <LayoutDashboard className="h-4 w-4 mr-2 " />
              Team Boards
            </Link>
          </Button>
          <Button 
            asChild 
            size={'lg'} 
            className="font-normal justify-start px-2 w-full" 
            variant={favorites ? "secondary" : "ghost"}>
            <Link href={{
              pathname: '/',
              query: { favorites: true }
            }}>
              <Star className="h-4 w-4 mr-2 " />
              Favorite Boards
            </Link>
          </Button>
        </div>
    </div>
  )
}

export default OrgSidebar