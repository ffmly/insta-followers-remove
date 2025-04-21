import axios from 'axios';

interface LoginResponse {
  success: boolean;
  error?: string;
  user?: {
    pk: string;
    username: string;
  };
}

interface FollowingUser {
  pk: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
}

const API_BASE = 'http://192.168.0.151:5001/api';

export const api = {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed',
      };
    }
  },

  async getFollowingList(): Promise<FollowingUser[]> {
    try {
      const response = await axios.get(`${API_BASE}/following`);
      if (response.data.success) {
        return response.data.following;
      }
      throw new Error(response.data.error || 'Failed to fetch following list');
    } catch (error: any) {
      console.error('Following list error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch following list');
    }
  },

  async unfollowUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axios.post(`${API_BASE}/unfollow`, { userId });
      return response.data;
    } catch (error: any) {
      console.error('Unfollow error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to unfollow user',
      };
    }
  },
}; 