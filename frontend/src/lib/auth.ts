export interface User {
  id: number
  name: string
  email: string
  role: 'STAFF' | 'ADMIN'
  community?: string
}

// Mock users for testing
const mockUsers = {
  'staff@umwiza.org': { password: 'staff123', user: { id: 1, name: 'John Doe', email: 'staff@umwiza.org', role: 'STAFF' as const, community: 'Kigali Village' } },
  'admin@umwiza.org': { password: 'admin123', user: { id: 2, name: 'Admin User', email: 'admin@umwiza.org', role: 'ADMIN' as const } },
}

export function login(email: string, password: string): User | null {
  const mockUser = mockUsers[email as keyof typeof mockUsers]
  if (mockUser && mockUser.password === password) {
    localStorage.setItem('user', JSON.stringify(mockUser.user))
    return mockUser.user
  }
  return null
}

export function logout() {
  localStorage.removeItem('user')
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}
