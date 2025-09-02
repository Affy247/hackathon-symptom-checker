'use client'

import { useState } from 'react'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'

export default function PremiumPage() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handlePayment = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    if (!session?.user?.email) {
      setError('You must be logged in to subscribe.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/flutterwave-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          amount: 2000, // ₦2,000
        }),
      })

      const data: any = await response.json()

      if (response.ok && typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
        ;(window as any).FlutterwaveCheckout(data)
        setSuccess('Payment initiated! Follow the prompt to complete.')
      } else if (!response.ok) {
        setError(data.error || 'Payment failed.')
      } else {
        setError('Flutterwave checkout is not available.')
      }
    } catch (err) {
      setError('Network error during payment.')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Premium Subscription</h1>
      <p className="mb-4">Subscribe for ₦2,000 to unlock premium features.</p>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-yellow-500 text-white p-2 rounded w-full"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  )
}
