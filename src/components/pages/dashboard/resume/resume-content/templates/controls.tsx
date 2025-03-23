import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Download, RotateCcw, ZoomInIcon, ZoomOut } from "lucide-react"
import { useControls } from "react-zoom-pan-pinch"

const TransformControls = () => {

	const { zoomIn, zoomOut, centerView } = useControls()

	const controls = [
		{
			icon: ZoomInIcon,
			label: "Aumentar Zoom",
			onClick: () => zoomIn(0.2)
		}, {
			icon: ZoomOut,
			label: "Diminuir Zoom",
			onClick: () => zoomOut(0.2)
		}, {
			icon: RotateCcw,
			label: "Resetar Posição",
			onClick: () => centerView(0.5)
		}, {
			icon: Download,
			label: "Baixar PDF",
			onClick: () => console.log('baixado')
		}
	]

	return (
		<div
			className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 bg-background border border-muted py-3 px-4 rounded-full flex items-center gap-2"
		>
			{controls.map((control) => (
				<TooltipProvider key={control.label}>
					<Tooltip key={control.label}>
						<TooltipTrigger>
						<Button
						variant='secondary'
						className="w-6 h-6 bg-transparent"
						size='icon'
						onClick={control.onClick}
						>
							<control.icon size={16}/>
						</Button>
						</TooltipTrigger>
						<TooltipContent>
							{control.label}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			))}
		</div>
	)
}

export default TransformControls