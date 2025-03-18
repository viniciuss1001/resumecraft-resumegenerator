import Image from "next/image"

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="w-full h-screen overflow-hidden grid grid-cols-[300px,1fr]">
            <aside className="w-full h-full flex flex-col items-center border-r border-muted">
                <div className="w-full p-6 border-b border-muted">
                <Image src="/logo.svg" width={96} height={86}  alt="Resume Creator" className="flex m-auto"/>
                </div>
            </aside>
            <main>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout