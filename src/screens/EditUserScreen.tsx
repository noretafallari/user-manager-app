// src/screens/EditUserScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';
import { User } from '../types/user';

interface EditUserScreenProps {
  route: {
    params: {
      user: User;
    };
  };
  navigation: any;
}

export const EditUserScreen: React.FC<EditUserScreenProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = route.params;
  
  const [formData, setFormData] = useState<User>(user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(updateUser(formData));
      Alert.alert('Success', 'User updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Enter full name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={formData.website}
            onChangeText={(value) => updateField('website', value)}
            placeholder="Enter website"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            value={formData.company.name}
            onChangeText={(value) => setFormData(prev => ({
              ...prev,
              company: { ...prev.company, name: value }
            }))}
            placeholder="Enter company name"
          />
        </View>

        {user.address && (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>Street</Text>
              <TextInput
                style={styles.input}
                value={formData.address?.street}
                onChangeText={(value) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address!, street: value }
                }))}
                placeholder="Enter street"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value={formData.address?.city}
                onChangeText={(value) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address!, city: value }
                }))}
                placeholder="Enter city"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Zipcode</Text>
              <TextInput
                style={styles.input}
                value={formData.address?.zipcode}
                onChangeText={(value) => setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address!, zipcode: value }
                }))}
                placeholder="Enter zipcode"
              />
            </View>
          </>
        )}

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Update User</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});