import { Area } from "react-easy-crop"

export const getCroppedImg = async (
	imageSrc: string,
	croppedAreaPixels: Area
 ): Promise<string> => {
	return new Promise((resolve, reject) => {
	  const image = new Image()
	  image.crossOrigin = "anonymous"
	  image.src = imageSrc
 
	  image.onload = () => {
		 const canvas = document.createElement("canvas")
		 canvas.width = croppedAreaPixels.width
		 canvas.height = croppedAreaPixels.height
		 const context = canvas.getContext("2d")
 
		 if (!context) {
			return reject("Contexto do canvas não encontrado")
		 }
 
		 context.drawImage(
			image,
			croppedAreaPixels.x,
			croppedAreaPixels.y,
			croppedAreaPixels.width,
			croppedAreaPixels.height,
			0,
			0,
			croppedAreaPixels.width,
			croppedAreaPixels.height
		 )
 
		 // Converter o canvas para base64
		 const base64Image = canvas.toDataURL("image/jpeg", 0.8) // Comprime a imagem
		 resolve(base64Image)
	  }
 
	  image.onerror = () => {
		 reject("Erro ao carregar imagem")
	  }
	})
 }
 