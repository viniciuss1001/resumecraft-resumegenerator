// DashboardGrid.tsx
"use client"

import { useSidebar } from "@/components/ui/sidebar"

type DashboardGridProps = {
  children: React.ReactNode
}

export const DashboardGrid = ({ children }: DashboardGridProps) => {
  const { open } = useSidebar()

  return (
    <div
      className="w-full h-screen overflow-hidden grid transition-all duration-300"
      style={{
        gridTemplateColumns: open ? "300px 1fr" : "10% 90%"
      }}
    >
      {children}
    </div>
  )
}
