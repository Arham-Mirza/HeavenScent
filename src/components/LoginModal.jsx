import { useState, useEffect } from 'react'

const initialForm = {
  email: '',
  password: '',
  name: '',
}

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm)
      setError('')
      setIsSignUp(false)
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isSignUp) {
      // Sign up logic
      if (!form.name || !form.email || !form.password) {
        setError('All fields are required')
        return
      }
      
      const users = JSON.parse(localStorage.getItem('heavenscent_users') || '[]')
      const existingUser = users.find(u => u.email === form.email)
      
      if (existingUser) {
        setError('Email already registered')
        return
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        name: form.name,
        email: form.email,
        password: form.password,
        createdAt: new Date().toISOString(),
        orderHistory: [],
      }
      
      users.push(newUser)
      localStorage.setItem('heavenscent_users', JSON.stringify(users))
      localStorage.setItem('heavenscent_current_user', JSON.stringify(newUser))
      
      onLogin(newUser)
      onClose()
    } else {
      // Login logic
      if (!form.email || !form.password) {
        setError('Email and password are required')
        return
      }
      
      const users = JSON.parse(localStorage.getItem('heavenscent_users') || '[]')
      const user = users.find(u => u.email === form.email && u.password === form.password)
      
      if (!user) {
        setError('Invalid email or password')
        return
      }
      
      localStorage.setItem('heavenscent_current_user', JSON.stringify(user))
      onLogin(user)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <aside className="login-modal">
        <header className="login-modal-header">
          <div>
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="login-modal-subtitle">
              {isSignUp ? 'Join HeavenScent to track orders and save preferences' : 'Sign in to your account'}
            </p>
          </div>
          <button className="login-modal-close" type="button" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="login-modal-body">
          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jordan Winters"
                  required
                />
              </label>
            )}
            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </label>
            
            {error && <p className="login-error">{error}</p>}
            
            <button className="pill-button wide" type="submit">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-toggle">
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-link">
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
