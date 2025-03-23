import { ButtonChangeTheme } from "@/components/darkmode/ButtonChangeTheme"
import NavItensComponent from "@/components/pages/dashboard/NavItens"
import UserDropdownComponent from "@/components/pages/dashboard/UserDropDown"
import { auth } from "@/lib/auth"
import Image from "next/image"

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = async({ children }: DashboardLayoutProps) => {
    const session = await auth()

    return (
        <div className="w-full h-screen overflow-hidden grid grid-cols-[300px,1fr]">
            <aside className="w-full h-full flex flex-col items-center border-r border-muted">
                <div className="w-full p-6 border-b border-muted">
                <Image src="/logo.svg" width={96} height={86}  alt="Resume Creator" className="flex m-auto"/>
                </div>

                <NavItensComponent />

                <div 
                className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
                    <UserDropdownComponent user={session?.user}/>
                    <ButtonChangeTheme/>
                </div>
            </aside>
            <main className="p-6 flex flex-col w-full h-full overflow-auto">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout