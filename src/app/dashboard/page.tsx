'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const sessionUser = supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        router.push('/login')
      } else {
        setUser(data.session.user)
      }
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}!</h1>
      <p className="mb-6">
        Use the links below to check symptoms, view results, or upgrade to premium.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => router.push('/symptom-check')}
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
        >
          Symptom Check
        </button>

        <button
          onClick={() => router.push('/results')}
          className="bg-green-500 text-white p-4 rounded hover:bg-green-600"
        >
          Results
        </button>

        <button
          onClick={() => router.push('/premium')}
          className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600"
        >
          Premium
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
