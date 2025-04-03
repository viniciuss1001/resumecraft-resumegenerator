"use client"
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle
} from "@/components/ui/resizable"
import InfoSidebarComponent from "./infos-sidebar/infos-sidebar"
import ResumeContentComponent from "./resume-content/resume-content"
import StructureSidebarComponent from "./structure-sidebar/structure-sidebar"
import { FormProvider, useForm } from "react-hook-form"
import { ResumeData } from "@/@types/types"
import { User } from "next-auth"
import { useDebounce } from "@/hooks/use-debounce"
import { useCallback, useEffect, useRef } from "react"
import { updateResumeData } from "@/db/actions"
import { useParams } from "next/navigation"
import { mergician } from 'mergician'


type ResumePageProps = {
  title: string,
  initialData: Partial<ResumeData>
  user?: User
}

const ResumePage = ({
  title, initialData, user
}: ResumePageProps) => {

  const defaultValues: ResumeData = {
    content: {
      summary: '<p></p>',
      image: {
        url: user?.image ?? '',
        visible: true
      },
      infos: {
        email: user?.email ?? '',
        fullName: user?.name ?? '',
        headline: '',
        location: '',
        phone: '',
        website: ''
      },
      certifications: [],
      educations: [],
      experiences: [],
      languages: [],
      projects: [],
      skills: [],
      socialMedias: []

    },
    structure: {
      template: "ditto",
      colorTheme: "slate",
      language: "portuguese",
      layout: {
        mainSections: [
          { key: "socialMedias" },
          { key: "summary" },
          { key: "experiences" },
          { key: "educations" },
          { key: "certifications" },
          { key: "projects" }
        ],
        sidebarSections: [
          { key: "languages" },
          { key: "skills" }
        ]
      }
    }
  }
  const params = useParams()
  const resumeId = params.id as string

  const methods = useForm<ResumeData>({ 
    defaultValues: mergician(defaultValues, initialData)
  })

  const data = methods.watch()
  const debouncedData = useDebounce(JSON.stringify(data))
  const shouldSave = useRef(false)

  const handleSaveUpdate = useCallback(() => {
    try {
      if (!shouldSave.current) {
        shouldSave.current = true
        return
      }
      const updatedData = methods.getValues()

      updateResumeData(resumeId, updatedData)

    } catch (error) {
      console.log(error)
    }
  }, [methods, resumeId])

  useEffect(() => {
    handleSaveUpdate()
  }, [debouncedData, handleSaveUpdate])

  return (
    <main className='w-full h-screen overflow-hidden'>
      <FormProvider {...methods}>
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
            <InfoSidebarComponent />
          </ResizablePanel>
          <ResizableHandle withHandle /> {/*panel resize*/}
          <ResizablePanel>
            <ResumeContentComponent title={title}/>
          </ResizablePanel>
          <ResizableHandle withHandle /> {/*panel resize*/}
          <ResizablePanel minSize={20} maxSize={35} defaultSize={25}>
            <StructureSidebarComponent />
          </ResizablePanel>
        </ResizablePanelGroup>
      </FormProvider>
    </main>
  )
}

export default ResumePage