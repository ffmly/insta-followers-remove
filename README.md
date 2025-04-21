# Instagram Unfollow Manager

A React Native mobile application that helps you manage your Instagram following list by allowing you to view and unfollow users easily.

## Features

- Secure Instagram login
- View your complete following list
- See user details including username, full name, and profile picture
- Unfollow users directly from the app
- Track your unfollowing activity

## Tech Stack

### Frontend
- React Native
- TypeScript
- React Navigation
- Axios for API calls

### Backend
- Python Flask
- instagrapi for Instagram API integration
- CORS enabled for cross-origin requests

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python app.py
   ```
   The server will run on `http://localhost:5001`

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your device:
   - Press 'a' for Android
   - Press 'i' for iOS
   - Or scan the QR code with your phone's camera

## API Endpoints

- `POST /api/login` - Login to Instagram
- `GET /api/following` - Get your following list
- `POST /api/unfollow` - Unfollow a user

## Security Notes

- The app uses Instagram's official API through the instagrapi library
- Your credentials are only used for authentication and are not stored
- All API calls are made over HTTPS

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.
