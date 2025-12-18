const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1' : 'https://umwiza-rwanda-api.onrender.com/api/v1')

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

  async getChildHealthRecords(childId: string) {
    return this.request(`/children/${childId}/health`)
  }

  async getChildEducationRecords(childId: string) {
    return this.request(`/children/${childId}/education`)
  }

  async createChild(data: any) {
    try {
      return await this.request('/children', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    } catch (error) {
      // Mock successful creation for development
      console.log('Backend not available, simulating child creation')
      const newChild = {
        id: Date.now().toString(),
        childCode: `CH${String(Date.now()).slice(-3)}`,
        ...data,
        status: 'ACTIVE',
        isSponsored: false,
        family: {
          familyCode: data.familyId || 'FAM001',
          community: {
            name: 'Kigali Village'
          }
        }
      }
      return {
        success: true,
        data: newChild,
        message: 'Child created successfully'
      }
    }
  }

  async updateChild(id: string, data: any) {
    try {
      return await this.request(`/children/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    } catch (error) {
      // Mock successful update for development
      console.log('Backend not available, simulating child update')
      return {
        success: true,
        data: { id, ...data },
        message: 'Child updated successfully'
      }
    }
  }

  async deleteChild(id: string) {
    try {
      return await this.request(`/children/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      // Mock successful deletion for development
      console.log('Backend not available, simulating child deletion')
      return {
        success: true,
        message: 'Child deleted successfully'
      }
    }
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
    // Try to fetch from backend first, fallback to mock data
    try {
      return await this.getChildren()
    } catch (error) {
      console.log('Backend not available, using mock data')
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
            photoUrl: '/images/amani.jpg',
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
            photoUrl: '/images/jean.jpg',
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
            photoUrl: '/images/grace.jpg',
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
          },
          {
            id: '4',
            childCode: 'CH004',
            firstName: 'David',
            lastName: 'Nkurunziza',
            dateOfBirth: '2013-05-12',
            gender: 'MALE',
            photoUrl: '/images/david.jpg',
            isSponsored: true,
            gradeLevel: 'Grade 5',
            schoolName: 'Unity Primary School',
            status: 'ACTIVE',
            family: {
              familyCode: 'FAM003',
              community: {
                name: 'Rubavu Town'
              }
            },
            sponsor: {
              firstName: 'Emma',
              lastName: 'Thompson'
            }
          }
        ],
        count: 4
      }
    }
  }

  async getMockChildById(id: string) {
    // Try to fetch from backend first, fallback to mock data
    try {
      return await this.getChildById(id)
    } catch (error) {
      console.log('Backend not available, using mock data')
      const children = await this.getMockChildren()
      const child = children.data.find(c => c.id === id)
      
      if (!child) {
        throw new Error('Child not found')
      }

      const mockHealthRecords = [
        {
          id: '1',
          date: '2025-01-15',
          type: 'Annual Checkup',
          description: 'Height: 125cm, Weight: 28kg. General health excellent.',
          doctor: 'Dr. Uwimana',
          hospital: 'Kigali Health Center'
        },
        {
          id: '2',
          date: '2024-09-10',
          type: 'Vaccination',
          description: 'Received annual flu vaccination and vitamin supplements.',
          doctor: 'Dr. Mukamana',
          hospital: 'Community Health Post'
        }
      ]

      const mockEducationRecords = [
        {
          id: '1',
          academicYear: '2024',
          term: 'Term 3',
          gradeLevel: child.gradeLevel,
          mathGrade: '87%',
          englishGrade: '82%',
          scienceGrade: '90%',
          attendance: '96%',
          classRank: '3/35',
          teacherComments: 'Excellent student with strong academic performance.'
        },
        {
          id: '2',
          academicYear: '2024',
          term: 'Term 2',
          gradeLevel: child.gradeLevel,
          mathGrade: '85%',
          englishGrade: '78%',
          scienceGrade: '88%',
          attendance: '94%',
          classRank: '4/35',
          teacherComments: 'Consistent improvement in all subjects.'
        }
      ]

      return {
        success: true,
        data: {
          ...child,
          interests: child.firstName === 'Amani' ? 'Reading, Drawing, Mathematics' :
                    child.firstName === 'Jean' ? 'Football, Science, Music' :
                    child.firstName === 'Grace' ? 'Writing, History, Art' :
                    'Sports, Technology, Reading',
          dreams: child.firstName === 'Amani' ? 'To become a doctor and help people in my community' :
                 child.firstName === 'Jean' ? 'To become an engineer and build schools' :
                 child.firstName === 'Grace' ? 'To become a teacher and educate children' :
                 'To become a pilot and travel the world',
          healthRecords: mockHealthRecords,
          educationRecords: mockEducationRecords
        }
      }
    }
  }
}

export const apiService = new ApiService()
export default apiService