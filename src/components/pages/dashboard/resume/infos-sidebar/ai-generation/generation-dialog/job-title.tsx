import InputField from "@/components/shared/InputField"
import { useForm, useFormContext } from "react-hook-form"
import EditorField from "../../editor/editor-field"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/services/api"
import { ResumeData } from "@/@types/types"
import { toast } from "sonner"

type FormData = {
	jobTitle: string
	jobDescription: string
}

type GenerationData = {
	headline: string
	summary: string
	skills: {
		name: string
		keywords: string
	}[]
}

type GenerateFromJobTitleProps = {
	onClose: () => void
}

const GenerateJobTitleComponent = ({ onClose }: GenerateFromJobTitleProps) => {

	const { control, formState, handleSubmit } = useForm<FormData>()
	const { setValue } = useFormContext<ResumeData>()

	const { mutateAsync: handleGenerate } = useMutation({
		mutationFn: ApiService.generateContentForJob
	})

	const onSubmit = async (formData: FormData) => {
		const data = await handleGenerate(formData)

		const generation = JSON.parse(data.data) as GenerationData

		setValue("content.infos.headline", generation.headline)
		setValue("content.summary", generation.summary)
		setValue("content.skills", generation.skills)

		toast.success("Conteúdo gerado com sucesso.")
		onClose()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<InputField
				control={control}
				name="jobTitle"
				label="Título da vaga"
				placeholder="Desenvolvedor"
				required
			/>
			<EditorField
				control={control}
				name="jobDescription"
				label="Descrição da Vaga (Opcional)"
				containerClassName="min-h-[200px] max-h-[300px]"
			/>
			<Button
				className="w-max ml-auto" type="submit"
				disabled={formState.isSubmitting}
			>
				{formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Gerar Conteúdo"}
			</Button>
		</form>
	)
}

export default GenerateJobTitleComponent