import { Button } from '@/components/ui/button'
import { BadgeCent, Bot, BriefcaseBusiness, CirclePercent, Languages, PencilLine } from 'lucide-react'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIGenerationMode } from '@/@types/types'
import GenerationDialog from './generation-dialog/generation-dialog'

const AiGeneratorBtnDropDown = () => {
  const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(null)

  const actions = [
    {
      label: "Comprar créditos",
      icon: CirclePercent,
      onClick: () => console.log('comprar'),
    },
    {
      label: "Gerar conteúdo para vaga de emprego",
      icon: BriefcaseBusiness,
      onClick: () => setGenerationMode('JOB_TITLE'),
    },
    {
      label: "Melhorar e corrigir conteúdo existente",
      icon: PencilLine,
      onClick: () => setGenerationMode('FIX_CONTENT')
    },
    {
      label: "Traduzir conteúdo existente",
      icon: Languages,
      onClick: () => setGenerationMode('TRANSLATE_CONTENT'),
    }
  ];


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='gap-2 text-xs px-2.5 py-1 h-9'>
          <Bot size={20} />
          Usar IA
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align='start'>
        <DropdownMenuLabel className='text-muted-foreground text-xs flex items-center gap-1'>
          Você possui {" "}
          <strong className='text-foreground inline-flex gap-0.5 items-center'>
            <BadgeCent size={16} /> 20
            Créditos
          </strong>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => (
          <DropdownMenuItem key={action.label}
          className='gap-2 cursor-pointer hover:brightness-105'
          onClick={action.onClick}
          
          >
            {<action.icon size={18} className='text-muted-foreground'/>}
            {action.label}
          </DropdownMenuItem>

        ))}
        {!!generationMode && (
          <GenerationDialog 
          mode={generationMode}
          open={!!generationMode}
          setOpen={(value) => {
            if(!value) setGenerationMode(null)
          }}
          />
        )}

      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default AiGeneratorBtnDropDown