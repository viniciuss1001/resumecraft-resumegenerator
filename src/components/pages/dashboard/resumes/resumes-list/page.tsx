import React from 'react'
import ResumeCardComponent from '../resume-card'
import AddResumeButtonComponent from '../add-resumes'
import NewResumeDialog from '../new-resume-dialog'

const ResumeList = () => {
  return (
    <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1'>
      <NewResumeDialog>
        <AddResumeButtonComponent />
      </NewResumeDialog>
      <ResumeCardComponent />
      <ResumeCardComponent />
      <ResumeCardComponent />
    </section>
  )
}

export default ResumeList