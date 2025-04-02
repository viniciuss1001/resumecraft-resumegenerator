import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from '../../public/logo.svg'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-screen bg-gradient-to-tl from-muted flex flex-col md:justify-center p-6 overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        <div>
          <Image src={Logo} alt="Criador de Currículos" className="w-full max-w-[100px] mb-8 dark:bg-white p-2 rounded-sm" />
          <h1 className="font-title font-bold text-5xl max-w-[500px]">
            Um criador de currículos gratuito e de fácil usabilidade
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Comece a criar seus currículos de forma rápida e fácil com nossos modelos!
          </p>
          <Link href='/dashboard/resumes' passHref>
            <Button className="mt-4" variant='default'>
              Começar agora
              <ChevronRight />
            </Button>
          </Link>
        </div>
        <div className="flex-1 relative h-full">
          <Image src='/dashboard.webp' alt="Imagem do Painel do Criador de Resumos" width={1200} height={800}
            className={cn(
              "md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:min-w-[80vw]",
              "rounded-lg overflow-hidden border-2 border-muted"
            )}
          />
        </div>
      </div>
    </main>
  );
}
