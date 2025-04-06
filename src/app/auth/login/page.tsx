import Image from "next/image"
import Logo from '../../../../public/logo.svg'
import { ButtonChangeTheme } from "@/components/darkmode/ButtonChangeTheme"
import { Button } from "@/components/ui/button"
import { Chrome, Github } from "lucide-react"
import { signIn } from "@/lib/auth"
import { FlickeringGrid } from "@/components/magicui/flickering-grid"


type Providers = "github" | "google"

const LoginPage = () => {

const theme = typeof window !== "undefined" ? localStorage.getItem("theme") : null

	const handleLogin = async (form: FormData) => {
		"use server"

		const provider = form.get("provider") as Providers

		await signIn(provider, { redirectTo: "/dashboard/resumes" })
	}

	return (
		<div className="lg:grid grid-cols-[1.5fr,1fr] h-screen">
			<aside className="hidden lg:block bg-slate-100 dark:bg-slate-950 w-auto">
				<div className="relative h-full w-full overflow-hidden rounded-lg border bg-background">
					<FlickeringGrid
						className="absolute inset-0 z-0 size-full "
						squareSize={4} gridGap={6} color={theme === "dark" ? "#FFFFFF" : "#6B7280"}
						maxOpacity={0.5} flickerChance={0.1}
					/>
				</div>
			</aside>

			<form className="p-10 flex justify-center flex-col flex-1" action={handleLogin}>
				<div className="flex items-center justify-between">
					<Image src={Logo} className="max-w-[80px] dark:bg-white dark:rounded-sm p-2"
						alt="Resume Creator"
					/>
					<ButtonChangeTheme />
				</div>
				<h1 className="text-2xl font-title font-bold">Entre em sua conta</h1>
				<p className="text-xs font-light ">Caso não possua conta, ela será criada automaticamente.</p>

				<div className="flex flex-col gap-4 mt-6">
					<Button
						variant='outline'
						className="w-full gap-2"
						name="provider"
						type="submit"
						value='github'
					>
						<Github size={16} />
						Entrar com o Github
					</Button>
					<Button
						variant='default'
						className="w-full gap-2"
						name="provider"
						type="submit"
						value='google'
					>
						<Chrome size={16} />
						Entrar com o Google
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LoginPage