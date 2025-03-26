"use client"
import DialogToUse, { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import InputField from '@/components/shared/InputField'
import { Button } from '@/components/ui/button'
import { createResume } from '@/db/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData ={
  title: string
}

const NewResumeDialog = (props: BaseDialogProps) => {

  const methods = useForm<FormData>()

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {

      const resume = await createResume(data.title)
      toast.success("Currículo criado com sucesso.")
      router.push(`/dashboard/resumes/${resume.id}`)
      
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar o currículo, tente novamente mais tarde.")
    }
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
            <InputField label='Título' name='title' required/>
            <Button type='submit'
            className='w-max mt-6 ml-auto'
            >
              Criar
            </Button>
        </form>
        </FormProvider>
    }
    />
  )
}

export default NewResumeDialog