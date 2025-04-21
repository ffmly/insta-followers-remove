import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { api } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'FollowingList'>;

type User = {
  pk: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
};

export default function FollowingListScreen({ navigation, route }: Props) {
  const [following, setFollowing] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [removedUsers, setRemovedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadFollowingList();
  }, []);

  const loadFollowingList = async () => {
    try {
      const users = await api.getFollowingList();
      setFollowing(users);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load following list');
      navigation.goBack();
    } finally {
      setInitialLoading(false);
    }
  };

  const currentUser = following[currentIndex];

  const handleUnfollow = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const response = await api.unfollowUser(currentUser.pk);
      if (response.success) {
        setRemovedUsers(prev => [...prev, currentUser]);
        
        if (currentIndex < following.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          navigation.navigate('Result', {
            removedUsers: removedUsers.map(user => ({
              username: user.username,
              fullName: user.full_name,
            })),
          });
        }
      } else {
        Alert.alert('Error', response.error || 'Failed to unfollow user');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to unfollow user');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (currentIndex < following.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0064e0" />
          <Text style={styles.loadingText}>Loading following list...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>No more users to review</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Result', {
              removedUsers: removedUsers.map(user => ({
                username: user.username,
                fullName: user.full_name,
              })),
            })}
          >
            <Text style={styles.buttonText}>View Results</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Review Following</Text>
        <Text style={styles.subtitle}>
          {currentIndex + 1} of {following.length}
        </Text>

        <View style={styles.userCard}>
          <Image
            source={{ uri: currentUser.profile_pic_url }}
            style={styles.userImage}
          />
          <Text style={styles.username}>{currentUser.username}</Text>
          <Text style={styles.fullName}>{currentUser.full_name}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={handleSkip}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.unfollowButton, loading && styles.buttonDisabled]}
            onPress={handleUnfollow}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Unfollow</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  userCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fullName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#eee',
  },
  unfollowButton: {
    backgroundColor: '#ff3b30',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
}); 