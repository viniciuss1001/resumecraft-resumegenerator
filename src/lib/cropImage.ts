// import { Area } from 'react-easy-crop'

// export async function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
// 	const image = await createImage(imageSrc)

// 	await new Promise((resolve) => (image.onload = resolve))

// 	const canvas = document.createElement("canvas")
// 	const ctx = canvas.getContext("2d")

// 	if(!ctx) throw new Error("Falha ao criar um contexto 2D. Tente novamente mais tarde.")

// 	canvas.width = crop.width
// 	canvas.height = crop.height

// 	ctx.drawImage(
// 		image, 
// 		crop.x,
// 		crop.y,
// 		crop.width,
// 		crop.height,
// 		0,
// 		0,
// 		crop.width,
// 		crop.height
// 	)

// 	return canvas.toDataURL("image/jpeg", 0.8)
// }

// function createImage(url: string): Promise<HTMLImageElement> {
// 	return new Promise((resolve, reject) => {
// 		const image = new Image()
// 		image.addEventListener("load", () => resolve(image))
// 		image.addEventListener("error", (error) => reject(error))
// 		image.src = url
// 	 })
// }
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
			const ctx = canvas.getContext("2d")

			if (!ctx) {
				return reject("Contexto do canvas não encontrado")
			}

			ctx.drawImage(
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

			canvas.toBlob((blob) => {
				if (!blob) {
					return reject("Falha ao converter imagem para blob")
				}
				const fileUrl = URL.createObjectURL(blob)
				resolve(fileUrl)
			}, "image/jpeg", 0.8) // Comprime aqui: 0.8 = 80% da qualidade
		}

		image.onerror = (err) => {
			reject("Erro ao carregar imagem")
		}
	})
}
