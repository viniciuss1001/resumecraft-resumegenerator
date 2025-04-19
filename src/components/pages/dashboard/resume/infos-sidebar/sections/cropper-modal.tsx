
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { UploadImage } from "@/db/actions"
import { getCroppedImg } from "@/lib/cropImage"
import { Loader2 } from "lucide-react"
import { useCallback, useState } from "react"
import Cropper from "react-easy-crop"
import { toast } from "sonner"

type CropperModalProps = {
	imageSrc: string
	onCropComplete: (croppedImageUrl: string) => void
	onCancel: () => void
	open?: boolean
}

const CropperModalComponent = ({ imageSrc, onCancel, onCropComplete, open }: CropperModalProps) => {

	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [isCropping, setIsCropping] = useState(false)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

	const onCropCompleteInternal = useCallback((_: any, croppedAreaPixels: any) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])


	const handleCropComplete = async () => {
		if (!croppedAreaPixels) return
	 
		try {
		  setIsCropping(true)
	 
		  console.log("Iniciando recorte...")
	 
		  // 1. Recorta
		  const base64Image = await getCroppedImg(imageSrc, croppedAreaPixels)
	 
		  console.log("Imagem recortada com sucesso:", base64Image)
	 
		  // 2. Envia
		  const uploadedUrl = await UploadImage(base64Image)
	 
		  console.log("Imagem enviada com sucesso:", uploadedUrl)
	 
		  // 3. Retorna a URL final para uso
		  onCropComplete(uploadedUrl)
		  toast.success("Imagem enviada com sucesso!")
		} catch (err) {
		  console.error("Erro ao cortar ou enviar a imagem:", err)
		  toast.error("Erro ao cortar/enviar imagem.")
		} finally {
		  setIsCropping(false)
		}
	 }
	 



	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent>
				<DialogTitle>
					<h3 className="font-semibold">Recortar Imagem</h3>
				</DialogTitle>
				<div className="relative w-full h-[300px] bg-muted">
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={1} //square
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropCompleteInternal}
					/>
				</div>

				<DialogFooter className="flex justify-end gap-2 mt-4">
					<Button variant='outline' onClick={onCancel}>Cancelar</Button>
					<Button onClick={handleCropComplete} disabled={isCropping}>
						{isCropping ? <Loader2 className="animate-spin" /> : "Cortar"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CropperModalComponent