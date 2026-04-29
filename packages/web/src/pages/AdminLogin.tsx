import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Varscona Theatre</p>
          <h1 className="font-display text-3xl font-bold text-white">Admin Access</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/10 rounded-lg p-8 space-y-4">
          <div>
            <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c9a84c] hover:bg-[#e8c96a] text-black font-bold text-sm tracking-widest uppercase py-3 rounded transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          Varscona Theatre · Content Management
        </p>
      </div>
    </div>
  )
}
