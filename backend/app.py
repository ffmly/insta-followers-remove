from flask import Flask, request, jsonify
from flask_cors import CORS
from instagrapi import Client

app = Flask(__name__)
CORS(app)

def login_to_instagram(username, password):
    """
    Log in to Instagram using the instagrapi Client.
    """
    cl = Client()
    try:
        cl.login(username, password)
        print("Login successful!")
        return cl
    except Exception as e:
        print(f"Login failed: {e}")
        return None

def get_following_list(client):
    """
    Fetch the list of users the account is following.
    """
    try:
        user_id = client.user_id  # Get logged-in user's ID
        following = client.user_following(user_id)
        return following
    except Exception as e:
        print(f"Failed to fetch following list: {e}")
        return {}

def unfollow_user(client, user_id):
    """
    Unfollow a user by their ID.
    """
    try:
        client.user_unfollow(user_id)
        return True
    except Exception as e:
        print(f"Failed to unfollow user with ID {user_id}: {e}")
        return False

# Store the client instance
instagram_client = None

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'status': 'ok', 'message': 'Server is running'})

@app.route('/api/login', methods=['POST'])
def login():
    global instagram_client
    print("Received login request")
    data = request.json
    print(f"Request data: {data}")
    
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        print("Missing username or password")
        return jsonify({'success': False, 'error': 'Username and password are required'}), 400
    
    try:
        print(f"Attempting to login with username: {username}")
        instagram_client = login_to_instagram(username, password)
        if instagram_client is None:
            print("Login failed - client is None")
            return jsonify({
                'success': False, 
                'error': 'Login failed. Please check your credentials and try again later.'
            }), 400
            
        user_id = instagram_client.user_id
        print(f"Login successful - user_id: {user_id}")
        
        return jsonify({
            'success': True,
            'user': {
                'pk': str(user_id),
                'username': username
            }
        })
            
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Login failed: {str(e)}'
        }), 400

@app.route('/api/following', methods=['GET'])
def following():
    global instagram_client
    if not instagram_client:
        return jsonify({'success': False, 'error': 'Not logged in'}), 401
    
    try:
        following = get_following_list(instagram_client)
        if not following:
            return jsonify({'success': False, 'error': 'Failed to fetch following list'}), 400
            
        following_list = []
        for user_id, user_info in following.items():
            # Convert HttpUrl to string
            profile_pic = str(user_info.profile_pic_url) if user_info.profile_pic_url else ''
            following_list.append({
                'pk': str(user_id),
                'username': user_info.username,
                'full_name': user_info.full_name or '',
                'profile_pic_url': profile_pic
            })
        
        return jsonify({
            'success': True,
            'following': following_list
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/unfollow', methods=['POST'])
def unfollow():
    global instagram_client
    if not instagram_client:
        return jsonify({'success': False, 'error': 'Not logged in'}), 401
    
    data = request.json
    user_id = data.get('userId')
    
    if not user_id:
        return jsonify({'success': False, 'error': 'User ID is required'}), 400
    
    try:
        success = unfollow_user(instagram_client, user_id)
        if success:
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': 'Failed to unfollow user'}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001) 