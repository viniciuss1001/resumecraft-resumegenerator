"use client"
import DialogToUse, { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import InputField from '@/components/shared/InputField'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type FormData ={
  title: string
}

const NewResumeDialog = (props: BaseDialogProps) => {

  const methods = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
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