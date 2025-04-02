import { ComponentProps } from "react"
import {Control, Controller, useFormContext} from 'react-hook-form'
import FieldWrapperComponent from "@/components/shared/field-wrapper"
import EditorComponent from "./editor"

type EditorFieldProps = {
  label: string, 
  name: string,
  containerClassName?: string,
  required?: boolean,
  control?: Control<any, any>
}

const EditorField = ({label, name, required,containerClassName, control: customControl, ...props}:EditorFieldProps) => {
    const {control} = useFormContext()
  return (
    <Controller 
      control={customControl ?? control}
      rules={{
        required: required && 'Campo obrigatório'
      }}
      name={name}
      render={({field, fieldState}) => (
        <FieldWrapperComponent label={label} className={containerClassName}>
          <EditorComponent {...props} {...field} />
          {fieldState.error && (
            <span className='text-red-500 text-sm'>
              {fieldState.error.message}
            </span>
          )}
        </FieldWrapperComponent>
      )}
    />
  )
}

export default EditorField