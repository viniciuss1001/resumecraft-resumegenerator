"use client"

import { BaseDialogProps } from "@/components/shared/Estructural-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { updateResumeTitle } from "@/db/actions"
import { useMutation } from "@tanstack/react-query"
import { Edit, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormData = {
	title: string
}

type EditTitleResume = BaseDialogProps & {
	receivedResumeId?: string
	placeholder?: string
}

const EditResumeTitleComponent = ({ receivedResumeId, placeholder }: EditTitleResume) => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
	const params = useParams()
	const router = useRouter()
	const resumeId = receivedResumeId ?? (params.id as string)

	const { mutate: handleEditTitle, isPending } = useMutation({
		mutationFn: (title: string) => updateResumeTitle(resumeId, title),
		onSuccess: () => {
			toast.success("Título atualizado com sucesso.")
			router.refresh()
		},
		onError: () => {
			toast.error("Erro ao atualizar o título. Tente novamente.")
		}
	})
	const onSubmit = async (data: FormData) => {
		handleEditTitle(data.title)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className="flex items-center justify-start w-full">
					<Edit />
					{placeholder ? <span className="text-xs">{placeholder}</span> : ''}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="m-2 gap-2">
					<DialogTitle className="m-1 font-title">
						Editar Título do Currículo
					</DialogTitle>
					<DialogDescription className="text-xs text-muted-foreground">
						Atualize o título do seu currículo.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
					<div>
						<Input placeholder="Novo título"
							{...register("title", { required: "Campo Obrigatório." })}
						/>
						{errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
					</div>
					<DialogFooter className="flex gap-2 justify-between mt-5">
						<DialogClose>
							<Button type="button" variant='ghost' disabled={isPending}>
								Cancelar
							</Button>
						</DialogClose>
						<Button variant='default' type="submit" disabled={isPending}>
							{isPending ? <Loader2 className="animate-spin" /> : "Salvar"}
						</Button>
					</DialogFooter>

				</form>
			</DialogContent>

		</Dialog>
	)
}

export default EditResumeTitleComponent