"use client"
import DialogToUse, { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import InputField from '@/components/shared/InputField'
import { Button } from '@/components/ui/button'
import { createResume } from '@/db/actions'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
  title: string
}

const NewResumeDialog = (props: BaseDialogProps) => {

  const methods = useForm<FormData>()

  const router = useRouter()

  const { mutate: handleCreateResume, isPending } = useMutation({
    mutationFn: createResume,
    onSuccess: (resume) => {
      toast.success("Currículo criado com sucesso.")
      router.push(`/dashboard/resumes/${resume.id}`)
    }
  })

  const onSubmit = async (data: FormData) => {
    handleCreateResume(data.title)
  }

  return (
    <DialogToUse
      {...props}
      title='Criar novo currículo'
      description='Preencha as informações abaixo para criar um novo currículo.'
      content={
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}
            className='flex flex-col'
          >
            <InputField label='Título' name='title' required />
            <Button type='submit'
              className='w-max mt-6 ml-auto'
              disabled={isPending}
            >
              {isPending ? <Loader2 className='animate-spin'/> : "Criar"}
            </Button>
          </form>
        </FormProvider>
      }
    />
  )
}

export default NewResumeDialog