import { AIGenerationMode } from '@/@types/types'
import DialogToUse, { BaseDialogProps } from '@/components/shared/Estructural-dialog'
import React from 'react'
import GenerateJobTitleComponent from './job-title'
type GenerationDialogProps = BaseDialogProps & {
	mode: AIGenerationMode
	setOpen: (open: boolean) => void
}

const GenerationDialog = ({mode, open, setOpen,...props }: GenerationDialogProps) => {
	const onClose = () => {
		setOpen(false)
	}

	const configPerMode: Record<AIGenerationMode, JSX.Element> = {
		JOB_TITLE: <GenerateJobTitleComponent onClose={onClose}/>,
		FIX_CONTENT: <div>Melhorar e corrigir conteúdo existente.</div>,
		TRANSLATE_CONTENT: <div>Traduzir conteúdo existente</div>
	}

	const content = configPerMode[mode]

	return (
		<DialogToUse 
		{...props}
		open={open}
		setOpen={setOpen}
		title='Inteligência Artificial'
		description='O conteúdo gerado irá sobrescrever os campos existentes. Cada geração consome 1 crédito'
		content={content}
		/>
	)
}

export default GenerationDialog