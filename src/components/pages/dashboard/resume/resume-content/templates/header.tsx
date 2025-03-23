import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Download, Home, Trash } from "lucide-react"
import Link from "next/link"

const ResumeContentHeader = () => {
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
								<Home size={18}/>
							</Button>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
								<p className="text-xs text-muted-foreground">Voltar ao painel</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<span className="text-muted-foreground">/</span>
				<p className="text-lg font-title font-bold ml-1">Título do Currículo</p>
			</div>
			<div className="flex gap-1">
			<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
							variant='secondary'
							className="w-8 h-8 bg-transparent"
							size='icon'
							>
								<Trash size={18}/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
								<p className="text-xs text-muted-foreground">Deletar Currículo</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider><TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
							variant='secondary'
							className="w-8 h-8 bg-transparent"
							size='icon'
							>
								<Copy size={18}/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
								<p className="text-xs text-muted-foreground">Duplicar Currículo</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
							variant='secondary'
							className="w-8 h-8 bg-transparent"
							size='icon'
							>
								<Download size={18}/>
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