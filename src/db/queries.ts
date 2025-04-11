import { auth } from "@/lib/auth";
import { cache } from "react";
import { db } from "./drizzle";
import { resumes, users } from "./schema";
import { eq } from "drizzle-orm";
import { ResumeDto } from "./types";

export const getResumes = cache(async (): Promise<ResumeDto[]> => {
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) return []

	const userResumes = await db.query.resumes.findMany({
		where: eq(resumes.userId, userId)
	})

	return userResumes
})

export const getResumeById = cache(async (id: string): Promise<ResumeDto | undefined> => {
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) return undefined

	const resume = await db.query.resumes.findFirst({
		where: eq(resumes.id, id)
	})

	return resume
})

export const getUserCreditsAndFreeResumes = cache(async () => {
	const session = await auth()

	const userId = session?.user?.id

	if(!userId) throw new Error("Usuário não autenticado.")

	const userCreditsInfo = await db.query.users.findFirst({
		columns: {
			credits: true,
			resumesCreditesFree: true
		},
		where: eq(users.id, userId)
	})

	return userCreditsInfo
})

export const getUserCredits = async () => {
	const session = await auth()
	const userId = session?.user?.id

  if (!userId) throw new Error("Usuário não encontrado.")

	const [user] = await db
	.select({
		credits: users.credits
	})
	.from(users)
	.where(eq(users.id, userId))

	if(!user) throw new Error("Usuário não encontrado.")

	return user.credits ?? 0
}