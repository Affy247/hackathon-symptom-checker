'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Auth from '@/lib/auth'

interface SymptomLog {
  id: number
  symptoms: string
  created_at: string
}

export default function ResultsPage() {
  const [logs, setLogs] = useState<SymptomLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      const { data: session } = await supabase.auth.getSession()
      const user = session?.session?.user

      if (!user) return

      const { data, error } = await supabase
        .from('symptom_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      else setLogs(data || [])

      setLoading(false)
    }

    fetchResults()
  }, [])

  return (
    <Auth>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Your Symptom Results</h1>
        {loading ? (
          <p>Loading...</p>
        ) : logs.length === 0 ? (
          <p>No symptom checks found.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li key={log.id} className="border p-2 rounded">
                <p><strong>Symptoms:</strong> {log.symptoms}</p>
                <p className="text-gray-500 text-sm">
                  Checked on: {new Date(log.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Auth>
  )
}
