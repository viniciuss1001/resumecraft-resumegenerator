import { Divide, LayoutTemplate } from "lucide-react"
import SectionTitleComponent from "../../infos-sidebar/section-title"
import { ResumeData, ResumeTemplates } from "@/@types/types"
import { Controller, useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import Image from "next/image"

const allTemplates: ResumeTemplates[] = ["ditto", "eevee", "jynx", "onix"]

const TemplatesListSectionComponent = () => {

	const { control } = useFormContext<ResumeData>()

	return (
		<div>
			<SectionTitleComponent
				title="Modelos" icon={LayoutTemplate}
			/>
			<Controller
				control={control}
				name="structure.template"
				render={({ field }) => (
					<div className="w-full grid grid-cols-2 gap-4 mt-4">
						{allTemplates.map((template, index) => {
							const isSelcted = field.value === template

							return (
								<button key={`${template}-${index}`}
									type="button"
									className={cn(
										"w-full aspect-auto relative rounded border-2 border-muted overflow-hidden hover:brightness-125 transition-all",
										isSelcted && "border-muted-foreground"
									)}
									onClick={() => field.onChange(template)}
								>
									<Image 
									className="w-full h-full object-cover rounded-sm"
									width={150} height={130}
									alt={template}
									src={`/templates/${template}.webp`}
									/>
									<div className="absolute text-sm inset-0 w-full h-full flex flex-col font-bold font-title capitalize items-center justify-end p-2 bg-gradient-to-tr from-background">
										{template}
									</div>
								</button>
							)
						})}
					</div>
				)}
			/>
		</div>
	)
}

export default TemplatesListSectionComponent