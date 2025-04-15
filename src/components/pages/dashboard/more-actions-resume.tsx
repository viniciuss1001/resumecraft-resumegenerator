import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import EditResumeTitleComponent from "./resume/resume-content/edit-title"
import DeleteResumeDialog from "./resume/resume-content/delete-resume-dialog"
import DuplicateResumeDialog from "./resume/resume-content/duplicate-resume-dialog"

type MoreActionsResumeComponentProps = {
	resumeId?: string
}

const MoreActionsResumeComponent = ({ resumeId }: MoreActionsResumeComponentProps) => {
	return (
		<div className="absolute top-2 right-2 z-10">
			<DropdownMenu >
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className="p-2 rounded-sm hover:bg-muted transition" >
						<MoreHorizontal className="size-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="cursor-pointer flex flex-col items-start justify-between" align="start" >
					{/*rename resume */}
					<EditResumeTitleComponent receivedResumeId={resumeId}
						placeholder="Editar Título"
					/>
					{/*Delete Dialog */}
					<DeleteResumeDialog receivedResumeId={resumeId}
						placeholder="Deletar Currículo"
					/>
					{/*duplicate resume dialog */}
					<DuplicateResumeDialog receivedResumeId={resumeId}
						placeholder="Duplicar Currículo"
					/>

					{/*download pdf */}
					{/* <TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button
									variant='secondary'
									className="w-8 h-8 bg-transparent"
									size='icon'
									onClick={handleDownloadResume}
									disabled={isLoading}
								>
									{isLoading ? <Loader2 className="animate-spin" /> : <Download size={18} />}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-xs text-muted-foreground">Baixar PDF</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider> */}

				</DropdownMenuContent>
			</DropdownMenu>

		</div>
	)
}

export default MoreActionsResumeComponent