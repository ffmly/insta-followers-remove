import { api } from './services/api';

async function testInstagramConnection() {
    try {
        console.log('Starting Instagram connection test...');
        
        const username = 'ffm.ly';
        const password = 'Ahmed20053021';
        
        console.log('Attempting to login...');
        const loginResult = await api.login(username, password);
        
        if (loginResult.success) {
            console.log('Login successful!');
            console.log('User details:', loginResult.user);
            
            // Wait a bit before fetching the following list
            console.log('\nWaiting 2 seconds before fetching following list...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            try {
                console.log('Fetching following list...');
                const followingList = await api.getFollowingList();
                console.log(`Found ${followingList.length} accounts you're following`);
                console.log('First 5 accounts:', followingList.slice(0, 5));
            } catch (followingError: any) {
                console.error('Error fetching following list:', followingError.message);
            }
        } else {
            console.error('Login failed:', loginResult.error);
        }
    } catch (error: any) {
        console.error('Error during test:', error.message);
        console.error('Full error:', error);
    }
}

// Run the test
testInstagramConnection(); 