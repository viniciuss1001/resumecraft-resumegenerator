"use client"
import SectionTitleComponent from '../section-title'
import { ScrollText } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import EditorComponent from '../editor/editor'

const SummaryComponent = () => {

    const {control}  = useFormContext()

  return (
    <div>
        <SectionTitleComponent title='Sobre Você' icon={ScrollText}/>
        <Controller
        control={control}
        name='content.summary'
        render={({field}) => (
            <EditorComponent
            {...field} 
            className='min-h-[200px] max-h-[300px] mt-4'
            />
        )}
        />
    </div>
  )
}

export default SummaryComponent