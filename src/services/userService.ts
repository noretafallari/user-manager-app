// src/services/userService.ts
import { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Network error occurred');
    }
  },
};