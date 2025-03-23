import { ResumeData, ResumeTemplates } from "@/@types/types"
import { Ditto } from "./resume-templates/ditto"
import { Eevee } from "./resume-templates/eevee"
import { Jynx } from "./resume-templates/jynx"
import { Onix } from "./resume-templates/onix"
import { useMemo } from "react"

export type BaseResumeProps = {
	data: ResumeData
}

type ResumeTemplateProps = {
	data: ResumeData
}

const templatesMap: Record<ResumeTemplates, React.FC<BaseResumeProps>> = {
	ditto: Ditto, 
	eevee: Eevee,
	jynx: Jynx,
	onix: Onix

}

const ResumeTemplate = ({ data }: ResumeTemplateProps) => {

	const template = data.structure.template

	const Resume = useMemo(() => {
		return templatesMap[template]
	}, [template])

	return (
		<div
			id="resume-content"
			className="w-[210mm] min-h-[297mm] bg-white text-black font-arial [&_hr]:border-black"
		>
			<Resume data={data} />
		</div>
	)
}

export default ResumeTemplate