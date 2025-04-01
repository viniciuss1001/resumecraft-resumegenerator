"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "../darkmode/theme-provider"
import { Toaster } from "../ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { useTanstackQuery } from "@/lib/tanstack-query"

type ClientProvidersProps = {
	children: ReactNode
}


const ClientProviders = ({ children }: ClientProvidersProps) => {
	const queryClient = useTanstackQuery()

	return (

		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute='class'
				defaultTheme='light'
				enableSystem
				disableTransitionOnChange
			>
				{children}
				<Toaster />
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default ClientProviders