import {Controller, useFormContext} from 'react-hook-form'
import FieldWrapperComponent from './field-wrapper'
import { Slider } from '../ui/slider'

type SliderFieldProps =  {
    label: string
    name: string
    containerClassName?: string
    required?: boolean
}

const SliderField = ({name, label, required, containerClassName}:SliderFieldProps) => {
    const {control} = useFormContext()
  return (
    <Controller 
      control={control}
      name={name}
      defaultValue={1}
      rules={{
        required: required && "Campo Obrigatório"
    }}
      render={({field, fieldState}) => (
        <FieldWrapperComponent label={label} className={containerClassName} >
            <div className='flex items-center gap-4'>
                <Slider 
                step={1}
                defaultValue={[1]}
                min={0} max={5}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                />
                <p className='font-bold'>
                    {field.value === 0 ? "Oculto" : field.value}
                </p>
                
            </div>
        </FieldWrapperComponent>

      )}
    />
  )
}

export default SliderField