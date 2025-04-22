"use client"

import { Facebook } from "lucide-react"

type SocialButtonsProps = {
  mode: "login" | "register"
  onSocialAuth: (provider: string) => void
}

export function SocialButtons({ mode, onSocialAuth }: SocialButtonsProps) {
  const buttonText = mode === "login" ? "Continuer avec" : "S'inscrire avec"

  return (
    <div className="space-y-4 mb-6">
      <button
        type="button"
        onClick={() => onSocialAuth("Google")}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <GoogleIcon className="w-5 h-5" />
        <span>{buttonText} Google</span>
      </button>

      <button
        type="button"
        onClick={() => onSocialAuth("Facebook")}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] text-white rounded-md hover:bg-[#166FE5] transition-colors"
      >
        <Facebook className="w-5 h-5" />
        <span>{buttonText} Facebook</span>
      </button>

      <button
        type="button"
        onClick={() => onSocialAuth("Apple")}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        <AppleIcon className="w-5 h-5" />
        <span>{buttonText} Apple</span>
      </button>
    </div>
  )
}

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

// Composant pour l'icône Apple
export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.05 20.28c-.98.95-2.05.94-3.1.43-1.11-.54-2.11-.53-3.28 0-1.38.62-2.1.51-3.16-.46C3.7 16.4 3.63 11.15 7.21 10.71c1.19-.23 2.03.2 2.76.57.61.31 1.13.58 1.99.58.78 0 1.26-.25 1.83-.54.78-.4 1.7-.88 3.03-.58 1.14.12 2.06.63 2.67 1.5-2.09 1.34-1.76 4.68.56 5.66-.65 1.41-1.32 2.78-3 3.38zM14.47 6.06c.8-1.07.75-2.56.18-3.66-.65.07-1.4.5-1.85 1.09-.42.56-.8 1.47-.66 2.32.71.08 1.44-.19 2.33-.75z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FormDivider() {
  return (
    <div className="relative flex items-center justify-center my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative px-4 bg-white text-sm text-gray-500">ou</div>
    </div>
  )
}
