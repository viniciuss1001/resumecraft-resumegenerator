import { UserRound } from "lucide-react"
import SectionTitleComponent from "../section-title"
import InputField from "@/components/shared/InputField"
import SwiftField from "@/components/shared/SwiftField"
import { useFormContext, useWatch } from "react-hook-form"
import UploadImageComponent from "./upload-image"

const BasicInforesume = () => {
  const { setValue } = useFormContext()
  const imageUrl = useWatch({ name: "content.image.url" })

  const handleImageChange = (newUrl: string) => {
    setValue("content.image.url", newUrl)
  }

  return (
    <div>
      <SectionTitleComponent
        icon={UserRound}
        title="Informações Básicas"
      />
      <div className="grid grid-cols-2 gap-4 mt-4 w-full">
        <div className="col-span-full w-full flex gap-3 items-center justify-around">
         <UploadImageComponent imageUrl={imageUrl} onImageChange={handleImageChange} />
        <div className="flex flex-col gap-2 items-center justify-center">
        <p className="font-xs font-medium">Mostar foto?</p>
        <SwiftField
            name="content.image.visible"
            className="mb-2 "
          />
        </div>

          {/* <InputField
            label="Foto"
            name="content.image.url"
            placeholder="URL da imagem"
            containerClassName="flex-1"
          /> */}
        </div>
        <InputField label="Nome Completo" name="content.infos.fullName" />
        <InputField label="Cargo" name="content.infos.headline" />
        <InputField label="Email" name="content.infos.email" />
        <InputField label="Site" name="content.infos.website" />
        <InputField label="Telefone" name="content.infos.phone" />
        <InputField label="Localização" name="content.infos.location" />

      </div>
    </div>
  )
}

export default BasicInforesume