import type { LabelHTMLAttributes } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className = '', children, ...props }: LabelProps) {
  return (
    <label className={`text-sm font-medium text-neutral-200 ${className}`} {...props}>
      {children}
    </label>
  )
}
