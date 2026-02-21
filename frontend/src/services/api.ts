const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1' : 'https://umwiza-rwanda-api.onrender.com/api/v1')

interface Child {
  id: string
  childCode: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  photoUrl?: string
  isSponsored: boolean
  gradeLevel?: string
  schoolName?: string
  status: string
  family: {
    familyCode: string
    community: {
      name: string
    }
  }
  sponsor?: {
    firstName: string
    lastName: string
  }
  interests?: string
  dreams?: string
  healthRecords?: any[]
  educationRecords?: any[]
}

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    if (typeof window === 'undefined') return {}
    
    const user = localStorage.getItem('user')
    if (!user) return {}
    
    // In a real app, you'd store and use JWT tokens
    return {
      'Authorization': `Bearer mock-token`,
      'Content-Type': 'application/json'
    }
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...(options.headers as Record<string, string> || {}),
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Children API
  async getChildren(params?: { communityId?: string; status?: string; isSponsored?: boolean }) {
    const searchParams = new URLSearchParams()
    if (params?.communityId) searchParams.append('communityId', params.communityId)
    if (params?.status) searchParams.append('status', params.status)
    if (params?.isSponsored !== undefined) searchParams.append('isSponsored', params.isSponsored.toString())
    
    const query = searchParams.toString()
    return this.request(`/children${query ? `?${query}` : ''}`)
  }

  async getChildById(id: string) {
    return this.request(`/children/${id}`)
  }

  async getChildHealthRecords(childId: string) {
    return this.request(`/children/${childId}/health`)
  }

  async getChildEducationRecords(childId: string) {
    return this.request(`/children/${childId}/education`)
  }

  async createChild(data: Record<string, any>) {
    return this.request('/children', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateChild(id: string, data: Record<string, any>) {
    return this.request(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteChild(id: string) {
    return this.request(`/children/${id}`, {
      method: 'DELETE',
    })
  }

  // Dashboard API
  async getStaffDashboard() {
    return this.request('/dashboard/staff')
  }

  async getAdminDashboard() {
    return this.request('/dashboard/admin')
  }

  // Families API
  async getFamilies(params?: { communityId?: string; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.communityId) searchParams.append('communityId', params.communityId)
    if (params?.status) searchParams.append('status', params.status)
    
    const query = searchParams.toString()
    return this.request(`/families${query ? `?${query}` : ''}`)
  }

  async getFamilyById(id: string) {
    return this.request(`/families/${id}`)
  }

  // Health Records API
  async getHealthRecords(params?: { childId?: string; recordType?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.childId) searchParams.append('childId', params.childId)
    if (params?.recordType) searchParams.append('recordType', params.recordType)
    
    const query = searchParams.toString()
    return this.request(`/health${query ? `?${query}` : ''}`)
  }

  async createHealthRecord(data: Record<string, any>) {
    return this.request('/health', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Education Records API
  async getEducationRecords(params?: { childId?: string; academicYear?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.childId) searchParams.append('childId', params.childId)
    if (params?.academicYear) searchParams.append('academicYear', params.academicYear)
    
    const query = searchParams.toString()
    return this.request(`/education${query ? `?${query}` : ''}`)
  }

  // Letters API
  async getLettersByChild(childId: string) {
    return this.request(`/letters/child/${childId}`)
  }

  async createLetter(data: Record<string, any>) {
    return this.request('/letters', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateLetterStatus(id: string, status: string) {
    return this.request(`/letters/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  // Media API
  async getMediaByChild(childId: string) {
    return this.request(`/media/child/${childId}`)
  }

  async uploadMedia(childId: string, sponsorId: string, file: File, description?: string) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('childId', childId)
    formData.append('sponsorId', sponsorId)
    if (description) formData.append('description', description)

    return this.request('/media/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type, let browser set it for FormData
        ...this.getAuthHeaders(),
      },
    })
  }

  async deleteMedia(id: string) {
    return this.request(`/media/${id}`, {
      method: 'DELETE',
    })
  }

  // Events API
  async getEvents(params?: { status?: string; eventType?: string; communityId?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.eventType) searchParams.append('eventType', params.eventType)
    if (params?.communityId) searchParams.append('communityId', params.communityId)
    
    const query = searchParams.toString()
    return this.request(`/events${query ? `?${query}` : ''}`)
  }

  async getEventById(id: string) {
    return this.request(`/events/${id}`)
  }

  async createEvent(data: Record<string, any>) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    })
  }

  // Families API
  async getFamilies(params?: { communityId?: string; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.communityId) searchParams.append('communityId', params.communityId)
    if (params?.status) searchParams.append('status', params.status)
    
    const query = searchParams.toString()
    return this.request(`/families${query ? `?${query}` : ''}`)
  }

  async getFamilyById(id: string) {
    return this.request(`/families/${id}`)
  }

  async createFamily(data: Record<string, any>) {
    return this.request('/families', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiService = new ApiService()
export default apiService