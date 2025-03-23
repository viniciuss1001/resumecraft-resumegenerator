import SectionTitleComponent from '../../infos-sidebar/section-title'
import { Palette } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { ResumeData } from '@/@types/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import colors from 'tailwindcss/colors'
import { useCallback, useEffect } from 'react'

const keysToIgnore = [
	"current", "inherit", "currentColor", "transparent", "black", "white", "neutral"
]

const colorsKey = Object.keys(colors).filter((key) => !keysToIgnore.includes(key)) as (keyof typeof colors)[]

const ResumeThemeComponent = () => {

	const { control, watch } = useFormContext<ResumeData>()

	const currentColorTheme = watch("structure.colorTheme")

	const handleSetCssVariables = useCallback(() => {
		if(!currentColorTheme) return

		const colorKey = currentColorTheme as keyof typeof colors

		document.documentElement.style.setProperty(
			"--resume-primary",
			colors[colorKey][500]
		)
	}, [currentColorTheme])

	useEffect(() => {
		handleSetCssVariables()
	},[handleSetCssVariables])

	return (
		<div>
			<SectionTitleComponent title='Tema' icon={Palette} />

			<Controller
				control={control}
				name="structure.colorTheme"
				render={({ field }) => (
					<div className='grid grid-cols-8 gap-4 mt-4'>
						{colorsKey.map(colorKey => {

							const isSelected = field.value === colorKey

							return (
								<Button key={colorKey}
									variant='ghost'
									className={cn(
										"w-7 h-7 rounded-full transition-all",
										isSelected && "ring-2 ring-foreground"

									)}
									onClick={() => field.onChange(colorKey)}
									style={{backgroundColor: colors[colorKey]?.[500] }}
								/>
							)
						})}
					</div>
				)}
			/>
		</div>
	)
}

export default ResumeThemeComponent