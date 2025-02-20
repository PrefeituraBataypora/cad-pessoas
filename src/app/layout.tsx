import { ThemeProvider } from '@/providers/theme'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cadastro de Clientes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
