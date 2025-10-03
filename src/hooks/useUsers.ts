// src/hooks/useUsers.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setLoading, setUsers, setError } from '../store/userSlice';
import { userService } from '../services/userService';

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    dispatch(setLoading(true));
    try {
      const fetchedUsers = await userService.fetchUsers();
      dispatch(setUsers(fetchedUsers));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { users, loading, error, refetch: loadUsers };
};