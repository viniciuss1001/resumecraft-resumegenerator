"use client"
import { animate, stagger } from 'motion/react'
import { splitText } from 'motion-plus'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type SplitTextComponentProps = {
	text: string
	titleClassName?: string
}

const SplitTextComponent = ({ text, titleClassName }: SplitTextComponentProps) => {

	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.fonts.ready.then(() => {
			if (!containerRef.current) return

			containerRef.current.style.visibility = 'visible'

			const { words } = splitText(
				containerRef.current.querySelector("h1")!
			)

			animate(
				words,
				{ opacity: [0, 1], y: [10, 0] },
				{
					 type: "spring",
					 duration: 2,
					 bounce: 0,
					 delay: stagger(0.05),
				}
		  )

		})
	},[])

	return (
		<div className='container' ref={containerRef}>
			<h1 className={cn(
				'h1',
				titleClassName
			)}>
				{text}
			</h1>
			<Stylesheet />
		</div>
	)
}

function Stylesheet() {
	return (
		 <style>{`
			  .container {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					max-width: 420px;
					text-align: left;
					visibility: hidden;
			  }

			  .split-word {
					will-change: transform, opacity;
			  }
		 `}</style>
	)
}

export default SplitTextComponent