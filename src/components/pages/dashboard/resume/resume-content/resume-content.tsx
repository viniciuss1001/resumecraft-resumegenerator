"use client"

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ResumeTemplate from './templates/resume-template'
import TransformControls from './templates/controls'
import ResumeContentHeader from './templates/header'
import { useFormContext } from 'react-hook-form'
import { ResumeData } from '@/@types/types'

type ResumeContentProps = {
  title: string
}

const ResumeContentComponent = ({ title }: ResumeContentProps) => {

  const { watch } = useFormContext<ResumeData>()

  const data = watch()

  return (
    <section className="overflow-hidden w-full h-full flex items-center justify-center relative bg-slate-100 dark:bg-background">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.4}
        centerOnInit
        centerZoomedOut
        limitToBounds={false}
      >
        <>
          <ResumeContentHeader title={title}/>
          <TransformControls title={title}/>
          <TransformComponent>
            <ResumeTemplate data={data} />
          </TransformComponent>
        </>

      </TransformWrapper>
    </section>
  )
}

export default ResumeContentComponent