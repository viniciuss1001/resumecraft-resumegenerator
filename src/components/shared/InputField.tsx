import { Input } from "../ui/input"
import { ComponentProps, ReactNode } from "react"
import {Controller, useFormContext} from 'react-hook-form'
import FieldWrapperComponent from "./field-wrapper"

type InputFieldProps = ComponentProps <typeof Input> & {
  label: string, 
  name: string,
  containerClassName?: string,
  extraContent?: (value: string) => ReactNode
}

const InputField = ({label, name, required,containerClassName, extraContent, ...props}:InputFieldProps) => {
    const {control} = useFormContext()
  return (
    <Controller 
      control={control}
      rules={{
        required: required && 'Campo obrigatório'
      }}
      name={name}
      render={({field, fieldState}) => (
        <FieldWrapperComponent label={label} className={containerClassName}>
          <Input {...props} {...field} />
          {fieldState.error && (
            <span className='text-red-500 text-sm'>
              {fieldState.error.message}
            </span>
          )}
          {extraContent && extraContent(field.value)}
        </FieldWrapperComponent>
      )}
    />
  )
}

export default InputField