import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

interface DialogToUseProps {
    children?: ReactNode
    title: string
    description?: string
    content: ReactNode
    open?: boolean
    setOpen?: (open: boolean) => void
}

const DialogToUse = ({
    children,
    title,
    description,
    content,
    open,
    setOpen,
}: DialogToUseProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children && (
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>

    )
}

export default DialogToUse