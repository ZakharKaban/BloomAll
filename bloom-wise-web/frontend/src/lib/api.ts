const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  async register(email: string, password: string, name: string) {
    const data = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Shop
  async getPlants(search?: string) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    return this.request<any[]>(`/shop/plants?${params.toString()}`);
  }

  async getPlant(id: string) {
    return this.request<any>(`/shop/plants/${id}`);
  }

  // Cart
  async getCart() {
    return this.request<{ items: any[]; total: number }>('/cart');
  }

  async addToCart(plantId: string, quantity: number = 1) {
    return this.request<any>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ plantId, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request<any>(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string) {
    return this.request<any>(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Favorites
  async getFavorites() {
    return this.request<any[]>('/favorites');
  }

  async addFavorite(plantId: string) {
    return this.request<any>(`/favorites/${plantId}`, {
      method: 'POST',
    });
  }

  async removeFavorite(plantId: string) {
    return this.request<any>(`/favorites/${plantId}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async getOrders() {
    return this.request<any[]>('/orders');
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`);
  }

  async createOrder(address: string, phone: string) {
    return this.request<any>('/orders', {
      method: 'POST',
      body: JSON.stringify({ address, phone }),
    });
  }

  // Profile
  async getProfile() {
    return this.request<any>('/account/profile');
  }

  async updateProfile(data: { name?: string; email?: string; password?: string }) {
    return this.request<any>('/account/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Plant Test
  async getQuestions() {
    return this.request<any[]>('/plant-test/questions');
  }

  async submitTest(answers: Record<number, string>) {
    return this.request<{ topPlant: any; additionalPlants: any[] }>('/plant-test/submit', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  async getTestResult() {
    return this.request<{ topPlant: any; additionalPlants: any[]; answers: any; score: number; createdAt: string }>('/plant-test/result');
  }

  // Admin
  async getAllPlants() {
    return this.request<any[]>('/admin/plants');
  }

  async createPlant(data: any) {
    return this.request<any>('/admin/plants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePlant(id: string, data: any) {
    return this.request<any>(`/admin/plants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePlant(id: string) {
    return this.request<any>(`/admin/plants/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();

