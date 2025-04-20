import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { removedUsers } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          You removed {removedUsers.length} users.
        </Text>

        {removedUsers.map((user, index) => (
          <View key={index} style={styles.userItem}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.fullName}>{user.fullName}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  userItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  fullName: {
    fontSize: 14,
    color: '#666',
  },
  exitButton: {
    backgroundColor: '#0064e0',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 