import type { ReactNode } from 'react'

interface DividerProps {
  children?: ReactNode
}

export function Divider({ children }: DividerProps) {
  if (!children) return <hr className="border-neutral-600" />

  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-neutral-600" />
      <span className="text-sm text-neutral-400">{children}</span>
      <span className="h-px flex-1 bg-neutral-600" />
    </div>
  )
}
