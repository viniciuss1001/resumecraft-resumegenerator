import { ResumeData } from '@/@types/types'
import ResumePage from '@/components/pages/dashboard/resume'
import { getResumeById } from '@/db/queries'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'

type DashboardResumePageProps = {
  params: {id: string}
}

const DashboardResumePage = async ({params} :DashboardResumePageProps ) => {

  const resumeId = params.id

  const resume = await getResumeById(resumeId)

  if(!resume) return notFound()

  const initalData = resume?.data as ResumeData

  const session = await auth()

  return (
    <div>
        <ResumePage title={resume.title} initialData={initalData} user={session?.user}/>
    </div>
  )
}

export default DashboardResumePage