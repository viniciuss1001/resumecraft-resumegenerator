import { LucideIcon } from "lucide-react"

interface SectionTitleComponentProps {
    title: string
    icon: LucideIcon
}

const SectionTitleComponent = ({icon: Icon, title}: SectionTitleComponentProps) => {
  return (
    <div className="flex items-center gap-2">
        <Icon size={18} className="text-muted-foreground"/>
        <h3 className="text-2xl font-title font-semibold">{title}</h3>
    </div>
  )
}

export default SectionTitleComponent