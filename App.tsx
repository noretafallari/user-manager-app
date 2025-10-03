// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { store } from './src/store';
import { UserListScreen } from './src/screens/UserListScreen';
import { UserDetailsScreen } from './src/screens/UserDetailsScreen';
import { AddUserScreen } from './src/screens/AddUserScreen';
import { EditUserScreen } from './src/screens/EditUserScreen';

export type RootStackParamList = {
  UserList: undefined;
  UserDetails: { user: any };
  AddUser: undefined;
  EditUser: { user: any };
};

const Stack = createStackNavigator<RootStackParamList>();

// Add Button Component for the Header
const AddButton = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.addButton}
      onPress={() => navigation.navigate('AddUser' as never)}
    >
      <Text style={styles.addButtonText}>+ Add</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen 
            name="UserList" 
            component={UserListScreen}
            options={{ 
              title: 'User Manager',
              headerRight: () => <AddButton />,
            }}
          />
          <Stack.Screen 
            name="UserDetails" 
            component={UserDetailsScreen}
            options={{ title: 'User Details' }}
          />
          <Stack.Screen 
            name="AddUser" 
            component={AddUserScreen}
            options={{ title: 'Add New User' }}
          />
          <Stack.Screen 
            name="EditUser" 
            component={EditUserScreen}
            options={{ title: 'Edit User' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});