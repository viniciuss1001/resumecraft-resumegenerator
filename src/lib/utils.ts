import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import colors from "tailwindcss/colors"
import tailwindConfig from '../../tailwind.config'
import { ResumeStructureData } from "@/@types/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTailwindHTML = (
  html: string,
  structure: ResumeStructureData
) => {

  const colorKey = structure.colorTheme as keyof typeof colors

  return `
   <html>
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
          tailwind.config = ${JSON.stringify(tailwindConfig)};
          document.documentElement.style.setProperty(
            "--resume-primary",
            "${colors[colorKey][500]}"
          );
        </script>
    </head>
    <body>
      ${html}
    </body>
   </html>
  `
}

export const isValidJSON = (json: string) => {
  try {
    JSON.parse(json)
    return true
  } catch (error) {
    return false
  }
}