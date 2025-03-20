import { Input } from "../ui/input"
import { ComponentProps } from "react"
import {Controller, useFormContext} from 'react-hook-form'
import FieldWrapperComponent from "./field-wrapper"
import IconInputComponent from "./icon-input"

type IconFieldProps = ComponentProps <typeof Input> & {
  label: string, 
  name: string,
  containerClassName?: string,
}

const IconField = ({label, name, required,containerClassName, ...props}:IconFieldProps) => {
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
          <IconInputComponent {...props} {...field} />
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

export default IconField