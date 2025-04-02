import { ResumeStructureData } from "@/@types/types"
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

export const ApiService = {
	getResumeUrl,
	generateContentForJob
}