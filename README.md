# Instagram Following Manager

A React Native mobile app that helps you manage your Instagram following list. The app allows you to review and unfollow Instagram users one by one.

## Features

- Instagram login
- Review following list one by one
- Unfollow or skip each user
- See progress as you go
- Final results summary

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Use Expo Go app on your mobile device to scan the QR code and run the app

## Implementation Notes

This is a prototype implementation that currently uses mock data. To make it fully functional:

1. Implement the Instagram API integration in the login screen
2. Replace mock following data with actual API calls
3. Implement the actual unfollow functionality using the Instagram API

## Dependencies

- React Native
- Expo
- React Navigation
- TypeScript

## Development

The app is structured into three main screens:

1. `LoginScreen`: Handles Instagram authentication
2. `FollowingListScreen`: Shows users one by one with unfollow/skip options
3. `ResultScreen`: Displays summary of unfollowed users

## Contributing

Feel free to submit issues and enhancement requests. 