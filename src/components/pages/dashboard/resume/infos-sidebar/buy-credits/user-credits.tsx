"use client"

import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const UserCreditsComponent = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [credits, setCredits] = useState<number | null>(null)

	useEffect(() => {
		const fetchCredits = async () => {
			try {
				const { data } = await api.get("/credits")
				setCredits(data.credits)
			} catch (error) {
				console.error("Erro ao buscar créditos", error)
			} finally {
				setLoading(false)
			}
		}

		fetchCredits()
	}, [])

	if (loading) return <Loader2 className="animate-spin" />

	return (
		<Badge variant='secondary' className='hidden md:block ml-auto mr-0'>
			{credits !== null ? (
				<p className="text-xs text-muted-foreground">Você tem {credits} créditos</p>
			) : (
				<p className="text-xs text-muted-foreground">Não foi possível carregar créditos.</p>
			)}
		</Badge>
	)
}

export default UserCreditsComponent
