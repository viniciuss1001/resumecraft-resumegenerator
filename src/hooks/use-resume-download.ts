import { ResumeData } from "@/@types/types"
import { api } from "@/lib/axios"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"

export const useResumeDownload = () => {

	const { getValues } = useFormContext<ResumeData>()

	const handleDownloadResume = async () => {

		const resume = document.getElementById("resume-content")
		const structure = getValues('structure')

		if (!resume) return

		const { data } = await api.post("/resume/download", {
			html: resume.outerHTML,
			structure,
		}, {
			responseType: "blob"
		})

		const url = window.URL.createObjectURL(data)
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "currículo.pdf")
		document.body.appendChild(link)
		link.click()
		link.remove()


		toast.success("Download com sucesso.")
	}

	return {
		handleDownloadResume
	}
}