"use server"

import { auth } from "@/lib/auth"
import { db } from "./drizzle"
import { resumes, users } from "./schema"
import { revalidatePath } from "next/cache"
import { ResumeData } from "@/@types/types"
import { eq } from "drizzle-orm"
import { getUserCreditsAndFreeResumes } from "./queries"
import { api } from "@/lib/axios"


export const createResume = async (title: string) => {
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) throw new Error("Usuário inexistente.")

	//get user credtis
	const [user] = await db
		.select({
			credits: users.credits,
			resumesCreatedFree: users.resumesCreditesFree
		})
		.from(users)
		.where(eq(users.id, userId))

	if (!user) throw new Error("Usuário não encontrado.")

	const { credits, resumesCreatedFree } = user

	//check if use 2 free credits
	if (resumesCreatedFree >= 2 && credits <= 0) {
		throw new Error("Você atingiu o limite de currículos gratuitos. Compre créditos para poder criar mais.")
	}

	//use credit, -1
	if (resumesCreatedFree >= 2 && credits > 0) {
		await db
			.update(users)
			.set({ credits: credits - 1 })
			.where(eq(users.id, userId))
	}

	//if has free resume, + 1
	if (resumesCreatedFree < 2) {
		await db
			.update(users)
			.set({ resumesCreditesFree: resumesCreatedFree + 1 })
			.where(eq(users.id, userId))
	}

	//to create a resume
	const newResume = await db
		.insert(resumes)
		.values({ title, userId })
		.returning()

	revalidatePath("/dashboard/resumes")

	return newResume[0]
}

export const updateResumeData = async (id: string, data: ResumeData) => {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) throw new Error("Usuário não encontrado.")

	const updateResume = await db
		.update(resumes)
		.set({ data, updatedAt: new Date() })
		.where(eq(resumes.id, id))
		.returning()

	revalidatePath("/dashboard/resumes")

	return updateResume[0]
}

export const deleteResumeData = async (id: string) => {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) throw new Error("Usuário não encontrado.")

	const resume = await db.query.resumes.findFirst({
		where: eq(resumes.id, id)
	})

	if (!resume) throw new Error("Currículo não encontrado")
	if (resume.userId !== userId) throw new Error("Usuário não autorizado")

	await db.delete(resumes).where(eq(resumes.id, id)).execute()

	revalidatePath("/dashboard/resumes")
}

export const duplicateResume = async (id: string, title: string) => {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) throw new Error("Usuário não encontrado.")

	const userCreditsInfo = await getUserCreditsAndFreeResumes()

	if (!userCreditsInfo) throw new Error("Informações sobre os créditos não encontradas.")

	const hasCredit = (userCreditsInfo.credits ?? 0) > 0

	if (!hasCredit) {
		throw new Error("Você não possui créditos para duplicar.")
	}

	//query for duplicate resume

	const resume = await db.query.resumes.findFirst({
		where: eq(resumes.id, id)
	})
	if (!resume) throw new Error("Currículo não encontrado.")

	const newResume = await db
		.insert(resumes)
		.values({
			title,
			userId,
			data: resume.data
		})
		.returning()

	//-1 credit
	await db
		.update(users)
		.set({
			credits: (userCreditsInfo.credits! - 1)
		})
		.where(eq(users.id, userId))


	revalidatePath("/dashboard/resumes")

	return newResume[0]
}

export const updateResumeTitle = async (id: string, title: string) => {
	const session = await auth()
	const userId = session?.user?.id

	const resume = await db.query.resumes.findFirst({
		where: eq(resumes.id, id)
	})

	if (!userId) throw new Error("Usuário não encontrado.")
	if (resume?.userId !== userId) throw new Error("Usuário não autorizado.")

	const updatedResume = await db
		.update(resumes)
		.set({ title, updatedAt: new Date() })
		.where(eq(resumes.id, id))
		.returning()

	revalidatePath("/dashboard/resumes")

	return updatedResume[0]

}

export const UploadImage = async (base64Image: string) => {
	console.log("Enviando imagem para o servidor:", base64Image)
 
	const formData = new FormData()
	formData.append("file", base64Image)
 
	const response = await fetch(`${api}/upload`, {
		method: "POST",
		body: formData,
	})
	
 
	const data = await response.json()
 
	console.log("Resposta do servidor:", data)
 
	if (data.url) {
	  return data.url
	} else {
	  throw new Error("Erro ao enviar imagem para o servidor")
	}
 }
 
