'use client'

import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      toastOptions={{
        style: {
          background: 'var(--dark-800)',
          border: '1px solid var(--dark-700)',
          color: 'white',
        },
        className: 'font-sans',
      }}
    />
  )
}

export const toast = sonnerToast