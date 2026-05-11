import type { ChangeEvent } from 'react'
import { Input } from '../../atoms/Input'
import { Label } from '../../atoms/Label'

interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function FormField({ id, label, type = 'text', placeholder, value, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}
