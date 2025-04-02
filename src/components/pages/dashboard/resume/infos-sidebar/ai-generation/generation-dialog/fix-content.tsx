import { useForm, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/services/api"
import { ResumeContentData, ResumeData } from "@/@types/types"
import { toast } from "sonner"
import { mergician } from "mergician"


type GenerateFromJobTitleProps = {
	onClose: () => void
}

const FixContentAIComponent = ({ onClose }: GenerateFromJobTitleProps) => {

	const { formState, handleSubmit } = useForm()
	const { getValues, setValue } = useFormContext<ResumeData>()

	const { mutateAsync: handleGenerate } = useMutation({
		mutationFn: ApiService.fixContent
	})

	const onSubmit = async () => {
		const content = getValues("content")

		const data = await handleGenerate(content)

		const generation = JSON.parse(data.data)

		const mergeContent = mergician(content, generation) as ResumeContentData

		setValue("content", mergeContent)

		toast.success("Conteúdo gerado com sucesso.")
		onClose()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<p className="text-muted-foreground m-2 text-sm">
				Esta funcionalidade aprimora o conteúdo atual do currículo e também corrige possíveis erros.
			</p>
			<p className="text-muted-foreground m-2 text-sm">
				O conteúdo deve estar preenchido antes de ativar essa funcionalidade!
			</p>
			<Button
				className="w-max ml-auto" type="submit"
				disabled={formState.isSubmitting}
			>
				{formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Gerar Conteúdo"}
			</Button>
		</form>
	)
}

export default FixContentAIComponent