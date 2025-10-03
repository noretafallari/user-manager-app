// src/screens/UserDetailsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { User } from '../types/user';

interface UserDetailsScreenProps {
  route: {
    params: {
      user: User;
    };
  };
}

export const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { user } = route.params;

  const handleWebsitePress = () => {
    if (user.website) {
      const url = user.website.startsWith('http') ? user.website : `https://${user.website}`;
      Linking.openURL(url);
    }
  };

  const handlePhonePress = () => {
    if (user.phone) {
      Linking.openURL(`tel:${user.phone}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Company</Text>
          <Text style={styles.value}>{user.company.name}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <Text 
            style={[styles.value, user.phone && styles.link]}
            onPress={handlePhonePress}
          >
            {user.phone || 'N/A'}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Website</Text>
          <Text 
            style={[styles.value, user.website && styles.link]}
            onPress={handleWebsitePress}
          >
            {user.website || 'N/A'}
          </Text>
        </View>
      </View>

      {user.address && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Street</Text>
            <Text style={styles.value}>{user.address.street}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{user.address.city}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Zipcode</Text>
            <Text style={styles.value}>{user.address.zipcode}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});