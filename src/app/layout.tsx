import { ThemeProvider } from '@/providers/theme'
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { UserStoreProvider } from '@/providers/user'

export const metadata: Metadata = {
  title: 'Cadastro de Pessoas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="!p-2">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserStoreProvider>
            <Toaster richColors />
            {children}
          </UserStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
