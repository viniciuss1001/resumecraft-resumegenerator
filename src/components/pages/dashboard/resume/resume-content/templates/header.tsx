import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Download, Home } from "lucide-react"
import Link from "next/link"

import { ReactNode, useState } from "react"
import DeleteResumeDialog from "../delete-resume-dialog"
import DuplicateResumeDialog from "../duplicate-resume-dialog"
import { useResumeDownload } from "@/hooks/use-resume-download"

type ResumeContentHeaderProps = {
	title: string
	children?: ReactNode
	open?: boolean
	setOpen?: (open: boolean) => void
}

const ResumeContentHeader = (props: ResumeContentHeaderProps) => {

	const {handleDownloadResume} = useResumeDownload()

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
							>
								<Download size={18} />
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