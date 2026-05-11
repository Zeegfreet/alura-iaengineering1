import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md bg-neutral-700 px-4 py-3 text-neutral-100 placeholder:text-neutral-400 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 transition-shadow ${className}`}
      {...props}
    />
  )
}
