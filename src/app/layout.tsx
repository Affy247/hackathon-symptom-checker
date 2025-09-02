// src/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Symptom Checker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}

// Move navigation to a client component
import Link from 'next/link'

function Navigation() {
  return (
    <nav className="bg-gray-100 p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/symptom-check">Symptom Check</Link>
      <Link href="/results">Results</Link>
      <Link href="/premium">Premium</Link>
    </nav>
  )
}
