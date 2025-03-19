import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'
import React from 'react'

const AiGeneratorBtnDropDown = () => {
  return (
    <Button className='gap-2 text-xs px-2.5 py-1 h-9'>
        <Bot size={20} />
        Usar IA
    </Button>
  )
}

export default AiGeneratorBtnDropDown