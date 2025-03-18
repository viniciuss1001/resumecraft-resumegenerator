"use client"
import { Newspaper, Settings } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const NavItensComponent = () => {
    const pathname = usePathname()

    const navItens = [
        {
            label: 'Currículos',
            icon: Newspaper,
            path: '/dashboard/resumes'
        }, {
            label: 'Configuração de Contas',
            icon: Settings,
            path: '/dashboard/account'
        }
    ]

    return (
        <nav className='w-full flex flex-col gap-2 px-2 py-4'>
            {navItens.map((item, index) => {

                const isActive = pathname.startsWith(item.path)

                return (
                    <Link key={index} href={item.path}>
                        <Button variant='ghost'
                            className={cn(
                                'w-full gap-2 justify-start',
                                isActive && 'bg-accent'
                            )}>
                            <item.icon size={24} />
                            {item.label}
                        </Button>
                    </Link>
                )
            })}
        </nav>
    )
}

export default NavItensComponent