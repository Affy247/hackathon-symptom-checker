// src/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Symptom Checker</h1>
      <Link href="/login">
        <button className="bg-blue-500 text-white p-2 rounded">Go to Login</button>
      </Link>
    </div>
  )
}
