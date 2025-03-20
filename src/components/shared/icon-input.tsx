import React from 'react'
import { Input } from '../ui/input'
import { useDebounce } from '@/hooks/use-debounce'

type IconInputProps = {
  value: string, 
  onChange: (value: string) => void
  placeholder?: string
}

const IconInputComponent = ({value, onChange, placeholder}: IconInputProps) => {
  const debouncedValues = useDebounce(value)

  return (
    <div className='flex items-center gap-2'>
      <div className='w-8 h-8 min-w-8 rounded-full bg-background p.1.5'>
        {!!debouncedValues && <img src={`https://cdn.simpleicons.org/${debouncedValues}`} className='w-full h-full object-none'/>}
      </div>
      <Input 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      />
    </div>
  )
}

export default IconInputComponent