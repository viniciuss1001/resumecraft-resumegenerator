"use client"

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ResumeTemplate from './templates/resume-template'
import TransformControls from './templates/controls'
import ResumeContentHeader from './templates/header'

const ResumeContentComponent = () => {
  return (
    <section className="overflow-hidden w-full h-full flex items-center justify-center relative bg-muted dark: bg-background">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.4}
        centerOnInit
        centerZoomedOut
        limitToBounds={false}
      >
        <>
        <ResumeContentHeader />
        <TransformControls />
          <TransformComponent>
            <ResumeTemplate />
          </TransformComponent>
        </>

      </TransformWrapper>
    </section>
  )
}

export default ResumeContentComponent