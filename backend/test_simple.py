import requests

def test_simple():
    url = 'http://localhost:5001/test'
    print(f"Testing connection to {url}")
    
    try:
        response = requests.get(url, timeout=2)
        print(f"\nResponse Status: {response.status_code}")
        print(f"Response Body: {response.json()}")
    except requests.exceptions.Timeout:
        print("\nError: Request timed out after 2 seconds. The server might be not responding.")
    except requests.exceptions.ConnectionError as e:
        print(f"\nError: Could not connect to the server. Make sure the Flask server is running.")
        print(f"Detailed error: {str(e)}")
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == '__main__':
    test_simple() 