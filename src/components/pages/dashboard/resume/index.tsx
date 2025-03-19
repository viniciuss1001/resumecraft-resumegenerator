import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle
} from "@/components/ui/resizable"
import InfoSidebarComponent from "./infos-sidebar/infos-sidebar"
import ResumeContentComponent from "./resume-content/resume-content"
import StructureSidebarComponent from "./structure-sidebar/structure-sidebar"

const ResumePage = () => {
  return (
    <main className='w-full h-screen overflow-hidden'>
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
    </main>
  )
}

export default ResumePage