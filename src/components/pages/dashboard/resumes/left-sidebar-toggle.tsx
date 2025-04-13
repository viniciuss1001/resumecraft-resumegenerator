import { Button } from "@/components/ui/button"

type LeftSidebarToggleButtonProps = {
	open: boolean
	setOpen: (open: boolean) => void
}

const LeftSidebarToggleButton = ({ open, setOpen }: LeftSidebarToggleButtonProps) => {
	return (
		<Button variant='outline' size='sm' onClick={() => setOpen(!open)}>
			{open ? "Fechar" : "Abrir"}
		</Button>
	)
}

export default LeftSidebarToggleButton