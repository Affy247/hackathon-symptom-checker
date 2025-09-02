'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SymptomCheckPage() {
  const [symptoms, setSymptoms] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!symptoms.trim()) {
      setError('Please enter your symptoms')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/check-symptom/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      })

      const data = await response.json()
      if (response.ok) {
        // Redirect to results page with analysis
        router.push(`/results?analysis=${encodeURIComponent(data.analysis)}`)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Network error')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Symptom Checker</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter your symptoms, e.g., headache, fever, fatigue..."
          className="border p-2 rounded mb-2 w-full h-32"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? 'Checking...' : 'Check Symptoms'}
        </button>
      </form>
    </div>
  )
}
