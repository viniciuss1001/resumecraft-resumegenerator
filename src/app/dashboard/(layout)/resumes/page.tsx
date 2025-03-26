import ResumeList from "@/components/pages/dashboard/resumes/resumes-list/page"
import { Suspense } from "react"
import { Loader2 } from 'lucide-react'
const DashboardResume = () => {
    return (
        <>
            <h1 className="text-4xl font-title font-bold mb-6">Currículos</h1>

            <Suspense fallback={
                <Loader2 className="flex justify-center items-center animate-spin" />
            }>
                <ResumeList />
            </Suspense>
        </>
    )
}

export default DashboardResume