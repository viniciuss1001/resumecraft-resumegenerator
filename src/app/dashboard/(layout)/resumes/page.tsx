import ResumeList from "@/components/pages/dashboard/resumes/resumes-list/page"
import { Suspense } from "react"
import { Loader2 } from 'lucide-react'
import { SidebarTrigger } from "@/components/ui/sidebar"
const DashboardResume = () => {
    return (
        <>
            <div className="flex items-center justify-start gap-2">
                <div className=" flex justify-center mt-0 h-full">
                    <SidebarTrigger className="flex items-center justify-center w-12 h-12 relative mb-6" />
                </div>
                <h1 className="text-4xl font-title font-bold mb-6">Currículos</h1>
            </div>

            <Suspense fallback={
                <Loader2 className="flex justify-center items-center animate-spin" />
            }>
                <ResumeList />
            </Suspense>
        </>
    )
}

export default DashboardResume