import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"
import { toast } from "sonner"
import CropperModalComponent from "./cropper-modal"
import { Trash2, Upload } from "lucide-react"

type UploadImageProps = {
	imageUrl: string
	onImageChange: (newUrl: string) => void
}

const UploadImageComponent = ({ imageUrl, onImageChange }: UploadImageProps) => {

	const [preview, setPreview] = useState(imageUrl)
	const [cropImage, setCropImage] = useState<string | null>(null)
	const [isCropping, setIsCropping] = useState(false)

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		//verify type
		if (!file.type.startsWith("image/")) {
			toast.error("Por favor, envie uma imagem válida.")
			return
		}

		//verify length
		const fileSize = file.size / (1024 * 1024)

		const reader = new FileReader()

		reader.onload = () => {
			// if (reader.result) {
			// 	const newImgUrl = reader.result.toString()
			// 	setPreview(newImgUrl)
			// 	onImageChange(newImgUrl)
			// }

			const cropImage = reader.result as string

			if (fileSize > 1) {
				setCropImage(cropImage)
				setIsCropping(true)
			} else {
				setPreview(cropImage)
				onImageChange(cropImage)
			}
		}

		reader.readAsDataURL(file)
	}

	function handleCropComplete(croppedUrl: string) {
		setPreview(croppedUrl)
		onImageChange(croppedUrl)
		setIsCropping(false)
	}

	function handleReset() {
		setPreview("")
		onImageChange("")
	}

	return (
		<div className="flex items-center gap-2">
			<Avatar className="w-24 h-24">
				{preview ? (
					<AvatarImage src={preview} alt="Foto de Perfil" />
				) : (

					<AvatarFallback>IMG</AvatarFallback>
				)}
			</Avatar>

			<div className=" w-full flex flex-col gap-2">
				<Button asChild variant='outline' size='sm'>
					<label className="cursor-pointer">
						<Upload />
						Enviar Imagem
						<input type="file"
							accept="image/*"
							onChange={handleFileChange} className="hidden"
						/>
					</label>
				</Button>
				<Button variant='outline' size='sm' onClick={handleReset} disabled={!preview}>
					<Trash2 />
					Excluir imagem
				</Button>
			</div>

			{/* modal for image crop */}
			{cropImage && (
				<CropperModalComponent
					open={isCropping}
					imageSrc={cropImage}
					onCropComplete={handleCropComplete}
					onCancel={() => setIsCropping(false)}
				/>
			)}
		</div>
	)
}

export default UploadImageComponent