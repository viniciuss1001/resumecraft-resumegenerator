import { Label } from "../ui/label"

type FieldWrapperProps = {
    label: string
    children: React.ReactNode
}

const FieldWrapperComponent = ({label, children}: FieldWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
        <Label>
            {label}
        </Label>
        {children}
    </div>
  )
}

export default FieldWrapperComponent