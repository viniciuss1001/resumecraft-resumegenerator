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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"


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
    <main className='w-full h-screen overflow-hidden '>
      <FormProvider {...methods}>
        {/* Mobile layout: stack vertically */}
        <div className="flex flex-col h-[calc(100vh-5rem)] md:hidden overflow-y-hidden">
          <Dialog >
            <DialogTrigger asChild>
              <Button variant='outline' size='sm'>
                <ChevronDown size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] rounded">
              <div className=" overflow-y-auto ">
                <InfoSidebarComponent />
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex-1 overflow-y-auto">
            <ResumeContentComponent title={title} />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='sm'>
                <ChevronUp />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] rounded">
              <div className=" overflow-y-auto">
                <StructureSidebarComponent />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="hidden md:block w-full h-full">
          {/* left */}
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel minSize={10} maxSize={40} defaultSize={30} >
              <InfoSidebarComponent />
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/*panel resize*/}
            {/* center - content */}
            <ResizablePanel>
              <ResumeContentComponent title={title} />
            </ResizablePanel>
            <ResizableHandle withHandle /> {/*panel resize*/}
            {/* right side  */}
            <ResizablePanel minSize={20} maxSize={35} defaultSize={25}>
              <StructureSidebarComponent />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </FormProvider>
    </main >
  )
}

export default ResumePage