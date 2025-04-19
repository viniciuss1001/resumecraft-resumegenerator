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

	// Função para enviar a imagem em base64
	const sendImageToServer = async (base64Image: string) => {
		try {
			 const formData = new FormData();
			 formData.append("file", base64Image);
  
			 const response = await fetch("/api/upload", {
				  method: "POST",
				  body: formData,
			 });
  
			 // Verificar se a resposta foi bem-sucedida
			 if (!response.ok) {
				  throw new Error('Erro na comunicação com o servidor.');
			 }
  
			 const data = await response.json();
			 if (data.url) {
				  onImageChange(data.url);
				  setPreview(data.url);
				  toast.success("Imagem enviada com sucesso!");
			 } else {
				  toast.error("Erro ao enviar imagem.");
			 }
		} catch (error) {
			 console.error(error);
			 toast.error("Falha ao enviar imagem para o servidor.");
		}
  }
  

	// Função que manipula o arquivo selecionado
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		// Verifica se o arquivo é do tipo imagem
		if (!file.type.startsWith("image/")) {
			toast.error("Por favor, envie uma imagem válida.")
			return
		}

		// Verifica o tamanho do arquivo
		const fileSize = file.size / (1024 * 1024) // em MB

		const reader = new FileReader()

		// Lê o arquivo como base64
		reader.onload = () => {
			const base64Image = reader.result as string

			if (fileSize > 1) {
				// Se o arquivo for maior que 1MB, abre o modal de recorte
				setCropImage(base64Image)
				setIsCropping(true)
			} else {
				// Se o arquivo for menor que 1MB, envia para o servidor em base64
				sendImageToServer(base64Image)
			}
		}

		reader.readAsDataURL(file)
	}
	// Função para processar a imagem cortada
	const handleCropComplete = (croppedUrl: string) => {
		if (!croppedUrl) {
			 toast.error("Erro ao processar o corte da imagem.");
			 return;
		}
		
		sendImageToServer(croppedUrl);
		setIsCropping(false);
  }
  

	// Função para resetar a imagem
	const handleReset = () => {
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

			{/* Modal de corte de imagem, exibido se a imagem for maior que 1MB */}
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
