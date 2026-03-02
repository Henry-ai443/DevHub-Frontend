// API Service - Centralized API calls with error handling
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: this.getHeaders(options.includeAuth !== false),
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `API Error: ${response.status}`);
    }

    return data;
  }

  // ========== AUTH ENDPOINTS ==========
  async signup(email, password, role = 'DEVELOPER') {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
      includeAuth: false,
    });
  }

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false,
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async refreshToken() {
    return this.request('/auth/refresh', { method: 'POST' });
  }

  // ========== PROFILE ENDPOINTS ==========
  async getMyProfile() {
    return this.request('/profile/me');
  }

  async getDeveloperProfile(developerId) {
    return this.request(`/profile/developer/${developerId}`);
  }

  async browseDevelopers(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/profile/developers/browse?${query}`);
  }

  async updateDeveloperProfile(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    return fetch(`${this.baseURL}/profile/me/developer`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    }).then(res => res.json());
  }

  async updateClientProfile(data) {
    return this.request('/profile/me/client', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ========== PROJECT ENDPOINTS ==========
  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async getProject(projectId) {
    return this.request(`/projects/${projectId}`);
  }

  async updateProject(projectId, data) {
    return this.request(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async listProjects(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/projects?${query}`);
  }

  async inviteMember(projectId, developerId) {
    return this.request(`/projects/${projectId}/invite`, {
      method: 'POST',
      body: JSON.stringify({ developerId }),
    });
  }

  async acceptInvitation(invitationId) {
    return this.request(`/invitations/${invitationId}/accept`, {
      method: 'POST',
    });
  }

  async rejectInvitation(invitationId) {
    return this.request(`/invitations/${invitationId}/reject`, {
      method: 'POST',
    });
  }

  async removeMember(projectId, memberId) {
    return this.request(`/projects/${projectId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }

  // ========== TASK ENDPOINTS ==========
  async createTask(projectId, taskData) {
    return this.request(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getTask(taskId) {
    return this.request(`/tasks/${taskId}`);
  }

  async updateTask(taskId, data) {
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(taskId) {
    return this.request(`/tasks/${taskId}`, { method: 'DELETE' });
  }

  async listProjectTasks(projectId, filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/projects/${projectId}/tasks?${query}`);
  }

  async getAssignedTasks() {
    return this.request('/tasks/assigned');
  }

  // ========== MESSAGE ENDPOINTS ==========
  async sendDirectMessage(recipientId, message) {
    return this.request('/messages/direct', {
      method: 'POST',
      body: JSON.stringify({ recipientId, message }),
    });
  }

  async sendProjectMessage(projectId, message) {
    return this.request('/messages/project', {
      method: 'POST',
      body: JSON.stringify({ projectId, message }),
    });
  }

  async getConversations(pagination = {}) {
    const query = new URLSearchParams(pagination).toString();
    return this.request(`/messages/conversations?${query}`);
  }

  async getConversationMessages(conversationId, pagination = {}) {
    const query = new URLSearchParams(pagination).toString();
    return this.request(`/messages/conversations/${conversationId}?${query}`);
  }

  async getProjectMessages(projectId, pagination = {}) {
    const query = new URLSearchParams(pagination).toString();
    return this.request(`/messages/projects/${projectId}?${query}`);
  }

  async markConversationAsRead(conversationId) {
    return this.request(`/messages/conversations/${conversationId}/read`, {
      method: 'PUT',
    });
  }

  // ========== HIRE ENDPOINTS ==========
  async createHireRequest(data) {
    return this.request('/hires', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async acceptHireRequest(hireId) {
    return this.request(`/hires/${hireId}/accept`, {
      method: 'POST',
    });
  }

  async rejectHireRequest(hireId) {
    return this.request(`/hires/${hireId}/reject`, {
      method: 'POST',
    });
  }

  async completeHireRequest(hireId) {
    return this.request(`/hires/${hireId}/complete`, {
      method: 'POST',
    });
  }

  async getDeveloperHireRequests(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/hires/developer?${query}`);
  }

  async getClientHireRequests(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/hires/client?${query}`);
  }

  async createReview(hireId, data) {
    return this.request(`/hires/${hireId}/review`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDeveloperReviews(developerId) {
    return this.request(`/reviews/developer/${developerId}`);
  }

  // ========== REPORT ENDPOINTS ==========
  async createReport(data) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPendingReports() {
    return this.request('/reports/pending');
  }

  async resolveReport(reportId, data) {
    return this.request(`/reports/${reportId}/resolve`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export default new APIService();
