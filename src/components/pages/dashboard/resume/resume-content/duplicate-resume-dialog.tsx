"use client"
import { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { duplicateResume } from '@/db/actions'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Copy, Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
	title: string
}

type DuplicateResumeDialogProps = BaseDialogProps & {
	receivedResumeId?: string
	placeholder?: string
}

const DuplicateResumeDialog = ({ receivedResumeId, placeholder }: DuplicateResumeDialogProps) => {
	const methods = useForm<FormData>()
	const params = useParams()
	const router = useRouter()

	const resumeId = receivedResumeId ?? (params.id as string)

	const { mutate: handleDuplicateResume, isPending } = useMutation({
		mutationFn: (title: string) => duplicateResume(resumeId, title),
		onSuccess: (newResume) => {
			toast.success("Currículo duplicado com sucesso.")
			router.push(`/dashboard/resumes/${newResume.id}`)
		}
	})

	const onSubmit = async (data: FormData) => {
		handleDuplicateResume(data.title)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className="flex items-center justify-start w-full">
					<Copy />
					{placeholder ? <span className="text-xs">{placeholder}</span> : ''}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='m-2 gap-2'>
					<DialogTitle className='m-1 font-title'>
						Duplicar Currículo
					</DialogTitle>
					<DialogDescription className='text-xs text-foreground'>
						Criar um novo currículo igual esse.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Controller
						control={methods.control}
						name='title'
						rules={{ required: 'Campo Obrigatório' }}
						render={({ field }) => (
							<Input placeholder='Novo Título' required {...field} />
						)}
					/>
					<DialogFooter className='flex gap-2 justify-between mt-5'>
						<DialogClose>
							<Button type='button' variant='ghost'
								disabled={isPending}
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button variant='default' type='submit'
							disabled={isPending}
						>
							{isPending ? <Loader2 className='animate-spin' /> : "Duplicar"}
						</Button>
					</DialogFooter>
				</form>

			</DialogContent>
		</Dialog>

	)
}

export default DuplicateResumeDialog