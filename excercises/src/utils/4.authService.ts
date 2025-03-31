// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

export class AuthService {
  async login(credentials: { username: string; password: string }) {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error('Invalid token');
    }
    return data.token;
  }
}
