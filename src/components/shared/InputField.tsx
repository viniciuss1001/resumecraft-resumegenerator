import { Input } from "../ui/input"
import { ComponentProps } from "react"
import {Controller, useFormContext} from 'react-hook-form'
import FieldWrapperComponent from "./field-wrapper"

type InputFieldProps = ComponentProps <typeof Input> & {
  label: string, 
  name: string
}

const InputField = ({label, name, required, ...props}:InputFieldProps) => {
    const {control} = useFormContext()
  return (
    <Controller 
      control={control}
      rules={{
        required: required && 'Campo obrigatório'
      }}
      name={name}
      render={({field, fieldState}) => (
        <FieldWrapperComponent label={label}>
          <Input {...props} {...field} />
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

export default InputField