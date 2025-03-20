import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

type TooltipFieldComponentProps = {
    children: ReactNode
    content: string | number | ReactNode
}

const TooltipFieldComponent = ({
    children,
    content
}: TooltipFieldComponentProps) => {
    return (
        <div>
            <TooltipProvider>
                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>{children}</TooltipTrigger>
                    <TooltipContent>
                        <p>{content}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default TooltipFieldComponent