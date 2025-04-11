"use client"
import { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { deleteResumeData } from '@/db/actions'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type DeleteResumeProps = BaseDialogProps & {
	receivedResumeId?: string
	placeholder?: string
}

const DeleteResumeDialog = ({ receivedResumeId, placeholder }: DeleteResumeProps) => {

	const params = useParams()
	const router = useRouter()

	const resumeId = receivedResumeId ?? (params.id as string)

	const { mutate: handleDeleteResume, isPending } = useMutation({
		mutationFn: deleteResumeData,
		onSuccess: () => {
			toast.success("Currículo deletado com sucesso.")
			router.push("/dashboard/resumes")
		}
	})

	const onDelete = async () => {
		handleDeleteResume(resumeId)

	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className="flex items-center justify-start w-full">
					<Trash />
					{placeholder ? <span className='text-xs'>{placeholder}</span> : ''}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='m-2 gap-2'>
					<DialogTitle className='m-1 font-title'>
						Excluir Currículo
					</DialogTitle>
					<DialogDescription className='text-xs text-foreground'>
						Deseja realmente excluir esse currículo? Essa é uma ação que não pode ser desfeita.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex gap-2 justify-between'>
					<DialogClose>
						<Button type='button' variant='ghost'
							disabled={isPending}
						>
							Cancelar
						</Button>
					</DialogClose>
					<Button variant='destructive' onClick={onDelete}
						disabled={isPending}
					>
						{isPending ? <Loader2 className='animate-spin' /> : "Deletar"}
					</Button>
				</DialogFooter>

			</DialogContent>
		</Dialog>

	)
}

export default DeleteResumeDialog