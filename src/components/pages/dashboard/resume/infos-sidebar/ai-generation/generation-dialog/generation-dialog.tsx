import { AIGenerationMode } from '@/@types/types'
import DialogToUse, { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import React from 'react'
type GenerationDialogProps = BaseDialogProps & {
	mode: AIGenerationMode
}

const GenerationDialog = ({mode, ...props }: GenerationDialogProps) => {

	const configPerMode: Record<AIGenerationMode, JSX.Element> = {
		JOB_TITLE: <div>Gerar conteúdo para vaga de emprego</div>,
		FIX_CONTENT: <div>Melhorar e corrigir conteúdo existente.</div>,
		TRANSLATE_CONTENT: <div>Traduzir conteúdo existente</div>
	}

	const content = configPerMode[mode]

	return (
		<DialogToUse 
		{...props}
		title='Inteligência Artificial'
		description='O conteúdo gerado irá sobrescrever os campos existentes. Cada geração consome 1 crédito'
		content={content}
		/>
	)
}

export default GenerationDialog