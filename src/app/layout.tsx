import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ClientProviders from "@/components/shared/clitent-providers";
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito-sans' })

export const metadata: Metadata = {
  title: "Resume Creator",
  description: "Generate you Virtual Curriculum",
  icons: {
    icon: `/icon.png`
  }
};

setDefaultOptions({locale: ptBR})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn("min-h-screen, bg-background font-sans antialiased", nunitoSans.variable, nunito.variable)}>
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
