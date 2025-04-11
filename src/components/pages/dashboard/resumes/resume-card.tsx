import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ResumeDto } from '@/db/types'
import { formatDistanceToNow } from 'date-fns'
import MoreActionsResumeComponent from '../more-actions-resume'

interface ResumeCardButtonProps {
  title: string
  description: string
  icon?: ReactNode
}

export const ResumeCardButtonComponent = ({
  title,
  description,
  icon
}: ResumeCardButtonProps) => {
  return (
    <button className={cn(
      'w-full h-[300px] bg-muted/50 rounded border flex items-center justify-center relative outline-none overflow-hidden',
      "hover:brightness-105 dark:hover:brightness-125 transition-all dark:border-none",
    )}>
      {icon}
      <div className='absolute w-full left-0 bottom-0 p-3 text-left bg-gradient-to-t from-background/80'>
        <p className='text-sm font-semibold font-title'>{title}</p>
        <span className='block text-xs text-muted-foreground'>{description}</span>
      </div>
    </button>

  )
}

type ResumeCardProps = {
  resume: ResumeDto
}

const ResumeCardComponent = ({ resume }: ResumeCardProps) => {

  const formattedLastUpdate = formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })

  const resumeId = resume.id

  return (
   <div className='relative'>
    <MoreActionsResumeComponent resumeId={resumeId}/>

     <Link href={`/dashboard/resumes/${resume.id}`}
      className='block w-full'
    >
      <ResumeCardButtonComponent
        title={resume.title}
        description={`Última atualização ${formattedLastUpdate}`}
      />
    </Link>
   </div>
  )
}

export default ResumeCardComponent