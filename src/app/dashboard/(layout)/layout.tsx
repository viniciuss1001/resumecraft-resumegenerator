import { DashboardGrid } from "@/components/pages/dashboard/resumes/Dashboard-grid"
import ResumesLayoutSideBar from "@/components/pages/dashboard/resumes/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {

    return (
        <SidebarProvider>
            <div className="w-full h-screen">
                <DashboardGrid>
                    <ResumesLayoutSideBar />
                    <main className="p-6 flex flex-col w-full h-full overflow-auto">
                        {children}
                    </main>
                </DashboardGrid>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout