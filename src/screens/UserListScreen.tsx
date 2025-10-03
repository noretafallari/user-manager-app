// src/screens/UserListScreen.tsx
import React from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { useUsers } from '../hooks/useUsers';
import { useSearch } from '../hooks/useSearch';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/userSlice';
import { UserCard } from '../components/UserCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { User } from '../types/user';

interface UserListScreenProps {
  navigation: any;
}

export const UserListScreen: React.FC<UserListScreenProps> = ({ navigation }) => {
  const { users, loading, error } = useUsers();
  const { searchQuery, setSearchQuery, filteredUsers } = useSearch(users);
  const dispatch = useDispatch();

  const handleUserPress = (user: User) => {
    navigation.navigate('UserDetails', { user });
  };

  const handleEditUser = (user: User) => {
    navigation.navigate('EditUser', { user });
  };

  const handleDeleteUser = (userId: number) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => dispatch(deleteUser(userId))
        },
      ]
    );
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name or email..."
      />
      
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={handleUserPress}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            showActions={true}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    paddingVertical: 8,
  },
});