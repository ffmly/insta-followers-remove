import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import FollowingListScreen from './screens/FollowingListScreen';
import ResultScreen from './screens/ResultScreen';

export type RootStackParamList = {
  Login: undefined;
  FollowingList: { username: string };
  Result: {
    removedUsers: Array<{
      username: string;
      fullName: string;
    }>;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FollowingList" component={FollowingListScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 