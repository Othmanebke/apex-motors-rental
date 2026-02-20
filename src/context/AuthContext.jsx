import { createContext, useContext, useState } from 'react'

const ADMIN = {
  id: 'admin',
  nom: 'Othmane',
  prenom: 'Admin',
  email: 'admin@apex.fr',
  password: 'apex2026',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00.000Z',
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem('apexUsers') || '[]') } catch { return [] }
}
function saveUsers(arr) { localStorage.setItem('apexUsers', JSON.stringify(arr)) }
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('apexCurrentUser') || 'null') } catch { return null }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser)

  const login = (email, password) => {
    if (email.trim() === ADMIN.email && password === ADMIN.password) {
      setUser(ADMIN)
      localStorage.setItem('apexCurrentUser', JSON.stringify(ADMIN))
      return { ok: true }
    }
    const users = getUsers()
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password)
    if (!found) return { ok: false, error: 'Email ou mot de passe incorrect.' }
    setUser(found)
    localStorage.setItem('apexCurrentUser', JSON.stringify(found))
    return { ok: true }
  }

  const register = ({ nom, prenom, email, password }) => {
    const users = getUsers()
    const emailLow = email.trim().toLowerCase()
    if (emailLow === ADMIN.email || users.find(u => u.email.toLowerCase() === emailLow)) {
      return { ok: false, error: 'Cet email est déjà utilisé.' }
    }
    const newUser = {
      id: `u_${Date.now()}`,
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: emailLow,
      password,
      role: 'client',
      forfait: null,
      forfaitSince: null,
      createdAt: new Date().toISOString(),
    }
    saveUsers([...users, newUser])
    setUser(newUser)
    localStorage.setItem('apexCurrentUser', JSON.stringify(newUser))
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('apexCurrentUser')
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('apexCurrentUser', JSON.stringify(updated))
    if (updated.role !== 'admin') {
      const users = getUsers().map(u => u.id === updated.id ? updated : u)
      saveUsers(users)
    }
  }

  const setForfait = (forfaitId) => {
    updateUser({ forfait: forfaitId, forfaitSince: new Date().toISOString() })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, setForfait }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
