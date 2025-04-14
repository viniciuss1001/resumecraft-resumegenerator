import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"

type UploadImageProps = {
	imageUrl: string
	onImageChange: (newUrl: string) => void
}

const UploadImageComponent = ({imageUrl, onImageChange}:UploadImageProps) => {

	const [preview, setPreview] = useState(imageUrl)

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if(!file) return

		const reader = new FileReader()

		reader.onloadend = () => {
			if(reader.result) {
				const newImgUrl = reader.result.toString()
				setPreview(newImgUrl)
				onImageChange(newImgUrl)
			}
		}

		reader.readAsDataURL(file)
	}


  return (
	 <div className="flex  items-center gap-4">
		<Avatar className="w-24 h-24">
			<AvatarImage src={preview} alt="Foto de Perfil"/>
			<AvatarFallback>IMG</AvatarFallback>
		</Avatar>

		<Button asChild variant='outline' size='sm'>
			<label className="cursor-pointer">
				Trocar Imagem
				<input type="file"
				accept="image/*"
				onChange={handleFileChange} className="hidden"
				/>
			</label>
		</Button>
	 </div>
  )
}

export default UploadImageComponent