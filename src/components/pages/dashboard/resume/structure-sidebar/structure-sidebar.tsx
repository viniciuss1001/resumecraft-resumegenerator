import TemplatesListSectionComponent from './sections/templates'
import { Separator } from '@/components/ui/separator'
import LayoutSectionComponent from './sections/layout-section'
import ResumeThemeComponent from './sections/resume-theme'
import SelectLanguage from './sections/language'

const StructureSidebarComponent = () => {
  return (
    <aside className='w-full h-[calc(100vh-2rem)] md:h-full  p-6 overflow-y-auto my-4 rounded-sm'>
        <TemplatesListSectionComponent />
        <Separator className='my-5'/>
        <LayoutSectionComponent />
        <Separator className='my-5'/>
        <ResumeThemeComponent />
        <Separator className='my-5'/>
        <SelectLanguage />
    </aside>
  )
}

export default StructureSidebarComponent