import { AuthService } from '../utils/4.authService';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    fetchMock.resetMocks(); // Đảm bảo fetchMock không bị ảnh hưởng bởi test trước
    authService = new AuthService();
  });

  it('should return a token if login is successful', async () => {
    const mockToken = 'mocked-token';
    fetchMock.mockResponseOnce(JSON.stringify({ token: mockToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    const credentials = { username: 'testuser', password: 'password123' };
    const token = await authService.login(credentials);

    expect(token).toBe(mockToken);
    expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
  });

  it('should throw an error if the response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 400 });

    const credentials = { username: 'testuser', password: 'password123' };

    await expect(authService.login(credentials)).rejects.toThrow('Login failed');
  });

  it('should throw an error if the token is missing in the response', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    const credentials = { username: 'testuser', password: 'password123' };

    await expect(authService.login(credentials)).rejects.toThrow('Invalid token');
  });

  it('should throw an error if fetch fails', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const credentials = { username: 'testuser', password: 'password123' };

    await expect(authService.login(credentials)).rejects.toThrow('Network error');
  });
});
