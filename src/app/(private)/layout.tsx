import type { Metadata } from 'next'
import '../globals.css'
import { Navbar } from '@/components/navbar'
import { QueryProvider } from '@/providers/query'

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
      <QueryProvider>
        <body className="p-2">
          <Navbar />
          {children}
        </body>
      </QueryProvider>
    </html>
  )
}
