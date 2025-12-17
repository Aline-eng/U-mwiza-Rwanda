const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

class ApiService {
  private getAuthHeaders() {
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
        ...this.getAuthHeaders(),
        ...options.headers,
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

  async createChild(data: any) {
    return this.request('/children', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateChild(id: string, data: any) {
    return this.request(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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

  async createHealthRecord(data: any) {
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

  async createEducationRecord(data: any) {
    return this.request('/education', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Mock data for development (remove when backend is connected)
  async getMockChildren() {
    return {
      success: true,
      data: [
        {
          id: '1',
          childCode: 'CH001',
          firstName: 'Amani',
          lastName: 'Uwase',
          dateOfBirth: '2012-03-15',
          gender: 'FEMALE',
          photoUrl: '/children/child1.jpg',
          isSponsored: true,
          gradeLevel: 'Grade 6',
          schoolName: 'Kigali Primary School',
          status: 'ACTIVE',
          family: {
            familyCode: 'FAM001',
            community: {
              name: 'Kigali Village'
            }
          },
          sponsor: {
            firstName: 'Michael',
            lastName: 'Johnson'
          }
        },
        {
          id: '2',
          childCode: 'CH002',
          firstName: 'Jean',
          lastName: 'Mugabo',
          dateOfBirth: '2014-07-22',
          gender: 'MALE',
          photoUrl: '/children/child2.jpg',
          isSponsored: true,
          gradeLevel: 'Grade 4',
          schoolName: 'Hope Academy',
          status: 'ACTIVE',
          family: {
            familyCode: 'FAM001',
            community: {
              name: 'Kigali Village'
            }
          },
          sponsor: {
            firstName: 'Sarah',
            lastName: 'Williams'
          }
        },
        {
          id: '3',
          childCode: 'CH003',
          firstName: 'Grace',
          lastName: 'Ishimwe',
          dateOfBirth: '2010-11-08',
          gender: 'FEMALE',
          photoUrl: '/children/child3.jpg',
          isSponsored: false,
          gradeLevel: 'Grade 8',
          schoolName: 'St. Mary Secondary',
          status: 'ACTIVE',
          family: {
            familyCode: 'FAM002',
            community: {
              name: 'Musanze District'
            }
          }
        }
      ],
      count: 3
    }
  }

  async getMockChildById(id: string) {
    const children = await this.getMockChildren()
    const child = children.data.find(c => c.id === id)
    
    if (!child) {
      throw new Error('Child not found')
    }

    return {
      success: true,
      data: {
        ...child,
        interests: 'Reading, Drawing, Mathematics',
        dreams: 'To become a doctor and help people in my community',
        healthRecords: [
          {
            id: '1',
            recordDate: '2025-01-15',
            recordType: 'CHECKUP',
            title: 'Regular Health Checkup',
            description: 'Annual health screening - all good'
          }
        ],
        educationRecords: [
          {
            id: '1',
            academicYear: '2024',
            term: 'Term 3',
            gradeLevel: 'Grade 6',
            attendancePercentage: 95.5,
            overallPercentage: 87.5
          }
        ]
      }
    }
  }
}

export const apiService = new ApiService()
export default apiService