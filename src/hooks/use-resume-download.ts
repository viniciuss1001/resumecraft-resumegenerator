//import {} from '@/services/api'
import { ResumeData } from "@/@types/types"
import { api } from "@/lib/axios"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"

export const useResumeDownload = (title?: string) => {

	const { getValues } = useFormContext<ResumeData>()

	const handleDownloadResume = async () => {

		const resume = document.getElementById("resume-content")
		
		if (!resume) return
		const structure = getValues('structure')

		const { data } = await api.post(
			"/resume/download", 
			{
			html: resume.outerHTML,
			structure,
		}, {
			responseType: "blob"
		})

		const url = window.URL.createObjectURL(data)
		console.log(url)
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", `${title || "Currículo"}.pdf`)
		document.body.appendChild(link)
		link.click()
		link.remove()


		toast.success("Download com sucesso.")
	}

	return {
		handleDownloadResume
	}
}