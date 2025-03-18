import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

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

const ResumeCardComponent = () => {
  return (
    <Link href='/dashboard/resumes/examples'
      className='block w-full'
    >
      <ResumeCardButtonComponent 
      title='Meu Currículo'
      description='Meu currículo completo'
      />
    </Link>
  )
}

export default ResumeCardComponent