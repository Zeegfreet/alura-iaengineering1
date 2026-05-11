interface SocialLoginButtonProps {
  icon: string
  label: string
  onClick?: () => void
}

export function SocialLoginButton({ icon, label, onClick }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-lg p-3 text-sm text-neutral-300 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
    >
      <img src={icon} alt="" width={32} height={32} />
      {label}
    </button>
  )
}
