"use server"

import { auth } from "@/lib/auth"
import { db } from "./drizzle"
import { resumes } from "./schema"
import { revalidatePath } from "next/cache"
import { ResumeData } from "@/@types/types"
import { eq } from "drizzle-orm"

export const createResume = async (title: string) => {
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) throw new Error("Usuário inexistente.")

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