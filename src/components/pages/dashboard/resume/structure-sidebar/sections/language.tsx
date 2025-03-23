import { Languages } from "lucide-react"
import SectionTitleComponent from "../../infos-sidebar/section-title"
import { Controller, useFormContext } from "react-hook-form"
import { ResumeData, ResumeLanguage } from "@/@types/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type LanguageOption = {
	label: string;
	value: ResumeLanguage;
 };
 
 export const languagesOptions: LanguageOption[] = [
	{
	  label: "Inglês",
	  value: "english",
	},
	{
	  label: "Espanhol",
	  value: "spanish",
	},
	{
	  label: "Francês",
	  value: "french",
	},
	{
	  label: "Alemão",
	  value: "german",
	},
	{
	  label: "Italiano",
	  value: "italian",
	},
	{
	  label: "Português",
	  value: "portuguese",
	},
 ];

const SelectLanguage = () => {

	const { control } = useFormContext<ResumeData>()

	return (
		<div>
			<SectionTitleComponent title="LInguages" icon={Languages} />
			<Controller
				control={control}
				name="structure.language"
				render={({ field }) => (
					<Select value={field.value} onValueChange={field.onChange}
					>
						<SelectTrigger className="h-full w-full mt-4">
							<SelectValue placeholder="Escolher Língua"
							/>
						</SelectTrigger>
						<SelectContent>
							{languagesOptions.map((language) => (
								<SelectItem key={language.value} value={language.value}>
									{language.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
		</div>
	)
}

export default SelectLanguage