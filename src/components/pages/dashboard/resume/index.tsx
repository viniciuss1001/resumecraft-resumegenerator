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

const ResumePage = () => {

  const defaultValues = {
    content: {
      image: {
        url: '',
        visible: true
      },
      infos: {
        email:'',
        fullName: '',
        headline: '', 
        location: '',
        phone: '',
        website: ''
      }
    }
  }

  const methods = useForm<ResumeData>({defaultValues})

  return (
    <main className='w-full h-screen overflow-hidden'>
      <FormProvider {...methods}>
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
            <InfoSidebarComponent />
          </ResizablePanel>
          <ResizableHandle withHandle /> {/*panel resize*/}
          <ResizablePanel>
            <ResumeContentComponent />
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