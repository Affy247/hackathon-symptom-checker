'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to Symptom Checker</h1>
      <p className="mb-4">Please <Link href="/login" className="text-blue-500 underline">login</Link> to continue.</p>
    </div>
  )
}
