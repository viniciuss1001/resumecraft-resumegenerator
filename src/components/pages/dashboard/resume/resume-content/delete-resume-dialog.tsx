"use client"
import DialogToUse, { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { deleteResumeData } from '@/db/actions'
import { DialogClose } from '@radix-ui/react-dialog'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'


const DeleteResumeDialog = (props: BaseDialogProps) => {

	const params = useParams()
	const router = useRouter()

	const resumeId = params.id as string

	const onDelete = async () => {
		try {
			await deleteResumeData(resumeId)
			toast.success("Currículo deletado com sucesso.")
			router.push("/dashboard/resumes")

		} catch (error) {
			console.log(error)
			toast.error("Erro ao deletar o currículo. Tente novamente.")
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className="flex items-center justify-center">
					<Trash />
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
						<Button type='button' variant='ghost'>
							Cancelar
						</Button>
					</DialogClose>
					<Button variant='destructive' onClick={onDelete}>
						Deletar
					</Button>
				</DialogFooter>

			</DialogContent>
		</Dialog>

	)
}

export default DeleteResumeDialog