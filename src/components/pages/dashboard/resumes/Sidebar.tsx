import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'
import NavItensComponent from '../NavItens'
import UserDropdownComponent from '../UserDropDown'
import { ButtonChangeTheme } from '@/components/darkmode/ButtonChangeTheme'
import { auth } from '@/lib/auth'

const ResumesLayoutSideBar = async () => {
	const session = await auth()
	return (
		<Sidebar className=''>
			<SidebarHeader>
				<div className="w-full p-6 border-b border-muted">
					<Image src="/logo.svg" width={96} height={86} alt="Resume Creator" className="flex m-auto" />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavItensComponent />
			</SidebarContent>
			<SidebarFooter>
				<div
					className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
					<UserDropdownComponent user={session?.user} />
					<ButtonChangeTheme />
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}

export default ResumesLayoutSideBar



