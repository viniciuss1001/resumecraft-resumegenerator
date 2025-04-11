import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import EditResumeTitleComponent from "./resume/resume-content/edit-title"
import DeleteResumeDialog from "./resume/resume-content/delete-resume-dialog"
import DuplicateResumeDialog from "./resume/resume-content/duplicate-resume-dialog"

const MoreActionsResumeComponent = () => {
  return (
	 <div className="absolute top-2 right-2 z-10">
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className="p-2 rounded-sm hover:bg-muted transition" >
					<MoreHorizontal className="size-5"/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="cursor-pointer">
				<DropdownMenuItem>
					<EditResumeTitleComponent />
				</DropdownMenuItem>
				<DropdownMenuItem>
					<DuplicateResumeDialog />
				</DropdownMenuItem>
				<DropdownMenuItem>
					<DeleteResumeDialog />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

	 </div>
  )
}

export default MoreActionsResumeComponent