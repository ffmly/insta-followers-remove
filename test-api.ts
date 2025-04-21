import { api } from './services/api';

async function testLogin() {
    try {
        console.log('Testing login...');
        const result = await api.login('ffm.ly', 'Ahmed20053021');
        console.log('Login result:', result);
        
        if (result.success) {
            console.log('Login successful!');
            console.log('Testing following list...');
            const following = await api.getFollowingList();
            console.log('Following list:', following);
        } else {
            console.log('Login failed:', result.error);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testLogin(); 