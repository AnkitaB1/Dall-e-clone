import '../styles/globals.css'
import Headers from '@/components/Headers'
import PromptInput from '@/components/PromptInput'
import ClientProvider from '@/components/clientProvider'

export const metadata = {
  title: 'AI Art Creator',
  description: 'Made by Ankita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
    <body>
      <ClientProvider>
        <Headers />

        <PromptInput />

        {children}
      </ClientProvider>
    </body>
  </html>
    
    
  )
}
