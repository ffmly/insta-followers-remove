import { Client } from 'instagrapi';

class InstagramApi {
  private client: Client | null = null;

  async login(username: string, password: string): Promise<boolean> {
    try {
      this.client = new Client();
      await this.client.login(username, password);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async getFollowingList(): Promise<any[]> {
    if (!this.client) {
      throw new Error('Not logged in');
    }

    try {
      const user_id = this.client.user_id;
      const following = await this.client.user_following(user_id);
      
      // Convert to array format for easier handling
      return Object.entries(following).map(([id, user]) => ({
        id,
        username: user.username,
        fullName: user.full_name || 'No Name',
        imageUrl: user.profile_pic_url || 'https://placekitten.com/100/100',
      }));
    } catch (error) {
      console.error('Failed to fetch following list:', error);
      return [];
    }
  }

  async unfollowUser(userId: string): Promise<boolean> {
    if (!this.client) {
      throw new Error('Not logged in');
    }

    try {
      await this.client.user_unfollow(userId);
      return true;
    } catch (error) {
      console.error('Failed to unfollow user:', error);
      return false;
    }
  }
}

export const instagramApi = new InstagramApi(); 