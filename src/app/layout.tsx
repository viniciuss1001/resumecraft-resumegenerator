import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/darkmode/theme-provider";
import { Toaster } from "sonner";
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito-sans' })

export const metadata: Metadata = {
  title: "Resume Creator",
  description: "Generate you Virtual Curriculum",
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
        <ThemeProvider attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
