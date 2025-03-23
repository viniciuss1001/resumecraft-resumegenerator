import React from 'react'
import SectionTitleComponent from '../../infos-sidebar/section-title'
import { Palette } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { ResumeData } from '@/@types/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import colors from 'tailwindcss/colors'

const keysToIgnore = [
	"current", "inherit", "currentColor", "transparent", "black", "white", "neutral"
]

const colorsKey = Object.keys(colors).filter((key) => !keysToIgnore.includes(key)) as (keyof typeof colors)[]

const ResumeThemeComponent = () => {
	console.log(colorsKey)

	const { control } = useFormContext<ResumeData>()

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
								>
									<div
										className="w-full h-full rounded-full"
										style={{ backgroundColor: colors[colorKey][500] }}
									/>

								</Button>
							)
						})}
					</div>
				)}
			/>
		</div>
	)
}

export default ResumeThemeComponent