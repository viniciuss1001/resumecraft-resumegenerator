import { UserRound } from "lucide-react"
import SectionTitleComponent from "../section-title"
import InputField from "@/components/shared/InputField"
import SwiftField from "@/components/shared/SwiftField"

const BasicInforesume = () => {
  return (
    <div>
        <SectionTitleComponent 
        icon={UserRound}
        title="Informações Básicas"
        />
        <div className="grid grid-cols-2 gap-4 mt-4 w-full">
            <div className="col-span-full w-full flex gap-3 items-end">
                <InputField 
                label="Foto"
                name="content.image.url"
                placeholder="URL da imagem"
                containerClassName="flex-1"
                />
                <SwiftField 
                name="content.image.visible"
                className="mb-2 "
                />
            </div>
        </div>
    </div>
  )
}

export default BasicInforesume