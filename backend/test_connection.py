import requests
import json
import socket
import time

def test_connection():
    url = 'http://192.168.0.151:5001/api/login'
    data = {
        'username': 'ffm.ly',
        'password': 'Ahmed20053021'
    }
    
    print(f"Testing connection to {url}")
    print(f"With data: {json.dumps(data, indent=2)}")
    
    # Try to connect multiple times with increasing timeouts
    timeouts = [5, 10, 15]
    for timeout in timeouts:
        try:
            print(f"\nAttempting to connect with {timeout}s timeout...")
            start_time = time.time()
            response = requests.post(url, json=data, timeout=timeout)
            end_time = time.time()
            print(f"Request took {end_time - start_time:.2f} seconds")
            print(f"\nResponse Status: {response.status_code}")
            print(f"Response Headers: {json.dumps(dict(response.headers), indent=2)}")
            print(f"Response Body: {json.dumps(response.json(), indent=2)}")
            return
        except requests.exceptions.Timeout:
            print(f"\nError: Request timed out after {timeout} seconds. The server might be not responding.")
        except requests.exceptions.ConnectionError as e:
            print(f"\nError: Could not connect to the server. Make sure the Flask server is running.")
            print(f"Detailed error: {str(e)}")
            return
        except Exception as e:
            print(f"\nError: {str(e)}")
            return
    
    print("\nAll connection attempts failed.")

if __name__ == '__main__':
    test_connection() 