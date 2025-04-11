import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Download, Home, Loader2 } from "lucide-react"
import Link from "next/link"

import { ReactNode } from "react"
import DeleteResumeDialog from "../delete-resume-dialog"
import DuplicateResumeDialog from "../duplicate-resume-dialog"
import { useResumeDownload } from "@/hooks/use-resume-download"
import EditResumeTitleComponent from "../edit-title"

type ResumeContentHeaderProps = {
	title: string
	children?: ReactNode
	open?: boolean
	setOpen?: (open: boolean) => void
}

const ResumeContentHeader = (props: ResumeContentHeaderProps) => {

	const { handleDownloadResume, isLoading } = useResumeDownload(props.title)

	return (
		<header className="absolute w-full left-0 top-0 z-10 p-2 bg-background border-b border-muted flex items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link href='/dashboard/resumes' passHref>
								<Button
									variant='secondary'
									className="w-8 h-8 bg-transparent"
									size='icon'
								>
									<Home size={18} />
								</Button>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs text-muted-foreground">Voltar ao painel</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<span className="text-muted-foreground">/</span>
				<p className="text-lg font-title font-bold ml-1">
					{props.title}
				</p>
			</div>
			<div className="flex gap-1">
				{/*rename resume */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger >
							<EditResumeTitleComponent />
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs ">
								Renomear Currículo
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				{/*Delete Dialog */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger >
							<DeleteResumeDialog />
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs ">
								Deletar currículo
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				{/*duplicate resume dialog */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<DuplicateResumeDialog />
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs text-muted-foreground">Duplicar Currículo</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				{/*download pdf */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								variant='secondary'
								className="w-8 h-8 bg-transparent"
								size='icon'
								onClick={handleDownloadResume}
								disabled={isLoading}
							>
								{isLoading ? <Loader2 className="animate-spin"/> : <Download size={18} />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs text-muted-foreground">Baixar PDF</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				
			</div>
		</header>
	)
}

export default ResumeContentHeader