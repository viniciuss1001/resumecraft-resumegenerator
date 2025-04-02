import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useEffect } from "react"

export type BaseDialogProps = {
    children?: ReactNode
    open?: boolean
    setOpen?: (open: boolean) => void
}

type DialogToUseProps = BaseDialogProps & {
    title: string
    description?: string
    content: ReactNode

}

const DialogToUse = ({
    children,
    title,
    description,
    content,
    open,
    setOpen,
}: DialogToUseProps) => {

    useEffect(() => {
    },[open])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children &&
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            }
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    {description && 
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    }
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>

    )
}

export default DialogToUse