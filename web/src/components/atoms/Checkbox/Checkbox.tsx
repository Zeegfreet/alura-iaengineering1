import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-300 select-none">
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 cursor-pointer rounded accent-lime-400 ${className}`}
        {...props}
      />
      {label}
    </label>
  )
}
