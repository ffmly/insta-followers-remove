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
  Animated,
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
  const [fadeAnim] = useState(new Animated.Value(1));

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
        
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (currentIndex < following.length - 1) {
            setCurrentIndex(prev => prev + 1);
            fadeAnim.setValue(1);
          } else {
            navigation.navigate('Result', {
              removedUsers: removedUsers.map(user => ({
                username: user.username,
                fullName: user.full_name,
              })),
            });
          }
        });
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
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(prev => prev + 1);
        fadeAnim.setValue(1);
      });
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0095f6" />
          <Text style={styles.loadingText}>Loading your following list...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>All Done!</Text>
          <Text style={styles.subtitle}>You've reviewed all your following</Text>
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
        <View style={styles.header}>
          <Text style={styles.title}>Review Following</Text>
          <Text style={styles.subtitle}>
            {currentIndex + 1} of {following.length}
          </Text>
        </View>

        <Animated.View style={[styles.userCard, { opacity: fadeAnim }]}>
          <Image
            source={{ uri: currentUser.profile_pic_url }}
            style={styles.userImage}
          />
          <Text style={styles.username}>@{currentUser.username}</Text>
          <Text style={styles.fullName}>{currentUser.full_name}</Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={handleSkip}
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
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
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  userCard: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#262626',
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
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  skipButton: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
  },
  unfollowButton: {
    backgroundColor: '#ed4956',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  skipButtonText: {
    color: '#262626',
  },
}); 