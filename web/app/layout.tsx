import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guardian — Controle Parental',
  description: 'Plataforma de controle parental transparente e segura',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 antialiased">
        {children}
      </body>
    </html>
  )
}
