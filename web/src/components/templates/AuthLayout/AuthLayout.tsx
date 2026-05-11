import type { ReactNode } from 'react'
import { AuthBanner } from '../../organisms/AuthBanner'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-neutral-800 shadow-2xl md:grid-cols-2">
        <AuthBanner />
        <div className="flex flex-col justify-center px-8 py-10">
          {children}
        </div>
      </div>
    </div>
  )
}
