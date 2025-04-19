import { v4 as uuidV4 } from "uuid"
import path from "path"
import fs from "fs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const base64Image = data.get("file") as string

  if (!base64Image) return NextResponse.json({ error: "Falha ao enviar o arquivo" }, { status: 400 })

  const matches = base64Image.match(/^data:image\/([a-zA-Z]*);base64,([^\"]+)$/)
  if (!matches || matches.length !== 3) return NextResponse.json({ error: "Formato de imagem inválido" }, { status: 400 })

  const fileType = matches[1]
  const base64Data = matches[2]
  const buffer = Buffer.from(base64Data, "base64")

  const fileName = `${uuidV4()}.${fileType}`
  const filePath = path.join(process.cwd(), "public/uploads", fileName)

  try {
    fs.writeFileSync(filePath, buffer)
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error)
    return NextResponse.json({ error: "Erro ao salvar o arquivo no servidor" }, { status: 500 })
  }

  const imageUrl = `/uploads/${fileName}`
  return NextResponse.json({ url: imageUrl })
}
