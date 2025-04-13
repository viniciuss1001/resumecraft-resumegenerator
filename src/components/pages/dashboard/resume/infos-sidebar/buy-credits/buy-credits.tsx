"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/axios"
import { Coins, CoinsIcon, Loader2 } from "lucide-react"
import { useState } from "react"

const BuyCreditsComponent = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [selectedCredits, setSelectedCredits] = useState<number>(5)

	const handleBuyCredits = async () => {
		try {
			setLoading(true)

			const { data } = await api.post("checkout", { quantity: selectedCredits })

			if (data?.url) {
				window.location.href = data.url
			} else {
				throw new Error("URL do checkout não encontrada.")
			}


		} catch (error) {
			console.error("Erro ao iniciar compra:", error)
			alert("Erro ao iniciar compra. Tente novamente.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button className="flex items-center justify-center" variant='ghost'>
					<CoinsIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>

				<DialogHeader className="m-2 gap-2">
					<DialogTitle className="m1- font-title">
						<Coins className="m-2" />
						Comprar Créditos
					</DialogTitle>
					<DialogDescription className="text-xs text-muted-foreground">
						Compre créditos para poder criar novos currículos.
					</DialogDescription>
				</DialogHeader>

				<Select
					value={String(selectedCredits)}
					onValueChange={(value) => setSelectedCredits(Number(value))}
					disabled={loading}
				>
					<SelectTrigger>
						<SelectValue placeholder="Selecionar a quantidadee" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="5">5 Créditos - R$ 5</SelectItem>
						<SelectItem value="10">10 Créditos - R$ 9,49</SelectItem>
						<SelectItem value="20">20 Créditos - R$ 17,99</SelectItem>
					</SelectContent>
				</Select>
				<DialogFooter>
					<DialogClose>
						<Button type='button' variant='ghost'
							disabled={loading}
						>
							Cancelar
						</Button>
					</DialogClose>
					<Button onClick={handleBuyCredits}
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader2 className="animate-spin mr-2 size-4" />
								Processando
							</>
						) : "Comprar"}
					</Button>
				</DialogFooter>

			</DialogContent>

		</Dialog>
	)
}

export default BuyCreditsComponent