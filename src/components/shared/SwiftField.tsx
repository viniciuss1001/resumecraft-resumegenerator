import { Input } from "../ui/input"
import { ComponentProps } from "react"
import {Controller, useFormContext} from 'react-hook-form'
import FieldWrapperComponent from "./field-wrapper"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"

type SwiftFieldProps =  {
    name: string
    className?: string
}

const SwiftField = ({name, className, ...props}:SwiftFieldProps) => {
    const {control} = useFormContext()
  return (
    <Controller 
      control={control}
      name={name}
      render={({field}) => (
        <Switch {...props} checked={field.value}
        onChange={field.onChange}
        className={cn('flex', className)}
        />
      )}
    />
  )
}

export default SwiftField