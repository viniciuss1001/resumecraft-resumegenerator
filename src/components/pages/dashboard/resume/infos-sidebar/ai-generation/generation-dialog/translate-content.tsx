import { Controller, useForm, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/services/api"
import { ResumeContentData, ResumeData, ResumeLanguage } from "@/@types/types"
import { toast } from "sonner"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { languagesOptions } from "../../../structure-sidebar/sections/language"
import { mergician } from "mergician"

type FormData = {
	languages: ResumeLanguage
}


type GenerateFromJobTitleProps = {
	onClose: () => void
}

const TranslateContentComponent = ({ onClose }: GenerateFromJobTitleProps) => {

	const { control, formState, handleSubmit } = useForm<FormData>()
	const { setValue, getValues } = useFormContext<ResumeData>()

	const { mutateAsync: handleGenerate } = useMutation({
		mutationFn: ApiService.translate
	})

	const onSubmit = async (formData: FormData) => {
		const content = getValues("content")

		const selectedLanguage = languagesOptions.find(
			(item) => item.value === formData.languages
		)

		const data = await handleGenerate({
			content,
			language: selectedLanguage?.label!
		})

		const generation = JSON.parse(data.data)

		const mergedContent = mergician(content, generation) as ResumeContentData
		setValue("content", mergedContent)
		setValue("structure.language", formData.languages)

		toast.success("Conteúdo gerado com sucesso.")
		onClose()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<p className="text-muted-foreground m-2 text-sm">
				Selecione a linguagem para o qual você deseja traduzir seu currículo.
			</p>
			<Controller
				control={control}
				name="languages"
				rules={{ required: true }}
				render={({ field }) => (
					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Escolher Linguagem" />
						</SelectTrigger>
						<SelectContent>
							{languagesOptions.map((language) => (
								<SelectItem key={language.label}
									value={language.value}
								>
									{language.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
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

export default TranslateContentComponent