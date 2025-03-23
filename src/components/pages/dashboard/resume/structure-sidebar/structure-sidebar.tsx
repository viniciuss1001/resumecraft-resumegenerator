import React from 'react'
import TemplatesListSectionComponent from './sections/templates'
import { Separator } from '@/components/ui/separator'
import LayoutSectionComponent from './sections/layout-section'

const StructureSidebarComponent = () => {
  return (
    <aside className='w-full h-full p-6 overflow-y-auto'>
        <TemplatesListSectionComponent />
        <Separator className='my-5'/>
        <LayoutSectionComponent />
    </aside>
  )
}

export default StructureSidebarComponent