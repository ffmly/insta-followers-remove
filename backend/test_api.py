import requests
import json
import time

def test_login():
    url = 'http://localhost:5000/api/login'
    data = {
        'username': 'ffm.ly',
        'password': 'Ahmed20053021'
    }
    
    print("Testing login endpoint...")
    print(f"URL: {url}")
    print(f"Data: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.post(url, json=data)
        print(f"\nResponse Status Code: {response.status_code}")
        print(f"Response Headers: {json.dumps(dict(response.headers), indent=2)}")
        print(f"Response Body: {json.dumps(response.json(), indent=2)}")
    except requests.exceptions.ConnectionError:
        print("\nError: Could not connect to the server. Make sure the Flask server is running on http://localhost:5000")
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == '__main__':
    # Give the server a moment to start if it's just starting
    time.sleep(1)
    test_login() 