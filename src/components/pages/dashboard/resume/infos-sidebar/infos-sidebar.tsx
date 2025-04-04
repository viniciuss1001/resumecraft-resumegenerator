import Image from "next/image"
import Link from "next/link"
import Logo from '@/../public/logo.svg'
import AiGeneratorBtnDropDown from "./ai-generation/ai-generator"
import { Separator } from "@/components/ui/separator"
import BasicInforesume from "./sections/basic-info"
import SummaryComponent from "./sections/summary"
import MultiplesSectionsComponent from "./sections/multiples"

const InfoSidebarComponent = () => {
  return (
    <aside className="w-full h-full p-6 overflow-y-auto">
        <div className="w-full flex items-center justify-between">
        <Link href='/dashboard/resumes'>
          <Image src={Logo} alt="Resume Creator"
          width={100} height={10}/>
        </Link>
        <AiGeneratorBtnDropDown />
        </div>
        <Separator className="my-5"/>
        <BasicInforesume />
        <Separator className="my-5"/>
        <SummaryComponent /> 
        <Separator className="my-5" />
        <MultiplesSectionsComponent />
    </aside>
  )
}

export default InfoSidebarComponent