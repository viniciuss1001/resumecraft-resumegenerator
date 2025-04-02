import { ResumeContentData, ResumeStructureData } from "@/@types/types"
import { api } from "@/lib/axios"

type ResumeDownloadPayload = {
	html: string,
	structure: ResumeStructureData
}

const getResumeUrl = async (payload: ResumeDownloadPayload) => {
	const { data } = await api.post(
		"/resume/download", payload,
		{ responseType: "blob" }
	)

	return window.URL.createObjectURL(data)
}

type AIGenerationPayload = {
	jobTitle: string;
	jobDescription: string;
};

const generateContentForJob = async (payload: AIGenerationPayload) => {
	const { data } = await api.post("/generate/job-title", payload);

	return data;
}

const fixContent = async (content: ResumeContentData) => {
	const data = await api.post("/generate/fix-content", { content })

	return data
}

type AiTranslationPayload = {
	content: ResumeContentData
	language: string
}

const translate = async (payload: AiTranslationPayload) => {
	const { data } = await api.post("/generate/translate", payload)
	return data
}

export const ApiService = {
	getResumeUrl,
	generateContentForJob,
	fixContent,
	translate
}