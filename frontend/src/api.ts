const API_BASE = import.meta.env.VITE_API_URL ?? ''

function getToken(): string | null {
  return localStorage.getItem('admin_token')
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    if (window.location.pathname.startsWith('/admin')) {
      window.location.href = '/admin/login'
    }
  }
  return res.json()
}

export const api = {
  // Auth
  login(username: string, password: string) {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },
  me() {
    return request('/api/auth/me')
  },

  // Resources
  getResources() { return request('/api/resources') },
  createResource(data: any) { return request('/api/admin/resources', { method: 'POST', body: JSON.stringify(data) }) },
  updateResource(id: number, data: any) { return request(`/api/admin/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) }) },
  deleteResource(id: number) { return request(`/api/admin/resources/${id}`, { method: 'DELETE' }) },

  // Projects
  getProjects() { return request('/api/projects') },
  createProject(data: any) { return request('/api/admin/projects', { method: 'POST', body: JSON.stringify(data) }) },
  updateProject(id: number, data: any) { return request(`/api/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }) },
  deleteProject(id: number) { return request(`/api/admin/projects/${id}`, { method: 'DELETE' }) },

  // Opportunities
  getOpportunities() { return request('/api/opportunities') },
  createOpportunity(data: any) { return request('/api/admin/opportunities', { method: 'POST', body: JSON.stringify(data) }) },
  updateOpportunity(id: number, data: any) { return request(`/api/admin/opportunities/${id}`, { method: 'PUT', body: JSON.stringify(data) }) },
  deleteOpportunity(id: number) { return request(`/api/admin/opportunities/${id}`, { method: 'DELETE' }) },

  // Members
  getMembers() { return request('/api/members') },
  createMember(data: any) { return request('/api/admin/members', { method: 'POST', body: JSON.stringify(data) }) },
  updateMember(id: number, data: any) { return request(`/api/admin/members/${id}`, { method: 'PUT', body: JSON.stringify(data) }) },
  deleteMember(id: number) { return request(`/api/admin/members/${id}`, { method: 'DELETE' }) },

  // Internships
  getInternships() { return request('/api/internships') },
  createInternship(data: any) { return request('/api/admin/internships', { method: 'POST', body: JSON.stringify(data) }) },
  updateInternship(id: number, data: any) { return request(`/api/admin/internships/${id}`, { method: 'PUT', body: JSON.stringify(data) }) },
  deleteInternship(id: number) { return request(`/api/admin/internships/${id}`, { method: 'DELETE' }) },

  // Admins (super_admin only)
  getAdmins() { return request('/api/admin/admins') },
  createAdmin(data: any) { return request('/api/admin/admins', { method: 'POST', body: JSON.stringify(data) }) },
  updateAdmin(id: number, data: any) { return request(`/api/admin/admins/${id}`, { method: 'PUT', body: JSON.stringify(data) }) },
  deleteAdmin(id: number) { return request(`/api/admin/admins/${id}`, { method: 'DELETE' }) },
}
