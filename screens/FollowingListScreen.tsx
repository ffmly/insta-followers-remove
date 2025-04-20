import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'FollowingList'>;

type User = {
  id: string;
  username: string;
  fullName: string;
  imageUrl: string;
};

// Mock data - replace with actual API calls
const mockFollowing: User[] = [
  {
    id: '1',
    username: 'maria123',
    fullName: 'Maria',
    imageUrl: 'https://placekitten.com/100/100',
  },
  {
    id: '2',
    username: 'alex_turner',
    fullName: 'Alex Turner',
    imageUrl: 'https://placekitten.com/100/100',
  },
];

export default function FollowingListScreen({ navigation, route }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [removedUsers, setRemovedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const currentUser = mockFollowing[currentIndex];

  const handleUnfollow = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    // TODO: Implement actual unfollow API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    setRemovedUsers(prev => [...prev, currentUser]);
    setLoading(false);
    
    if (currentIndex < mockFollowing.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Navigate to results when done
      navigation.navigate('Result', {
        removedUsers: removedUsers.map(user => ({
          username: user.username,
          fullName: user.fullName,
        })),
      });
    }
  };

  const handleSkip = () => {
    if (currentIndex < mockFollowing.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Following List</Text>
      </View>

      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {currentIndex + 1} of {mockFollowing.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentIndex + 1) / mockFollowing.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.userCard}>
        <Image
          source={{ uri: currentUser.imageUrl }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{currentUser.fullName}</Text>
        <Text style={styles.userHandle}>{currentUser.username}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.unfollowButton]}
            onPress={handleUnfollow}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.unfollowButtonText}>Unfollow</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progress: {
    padding: 20,
    paddingTop: 0,
  },
  progressText: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0064e0',
    borderRadius: 2,
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userHandle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  actions: {
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
  skipButtonText: {
    fontSize: 16,
    color: '#666',
  },
  unfollowButton: {
    backgroundColor: '#ff3b30',
  },
  unfollowButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
}); 