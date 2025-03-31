import { AuthService } from '../utils/5.authService';
import fetchMock from 'jest-fetch-mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    fetchMock.resetMocks();
  });

  it('should return user data on successful login', async () => {
    const mockToken = 'mocked-token';
    const mockUserData = { id: 1, name: 'John Doe' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    } as Response);

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    } as Response);

    const credentials = { username: 'testuser', password: 'password123' };
    const result = await authService.login(credentials);

    expect(result).toEqual(mockUserData);
    expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mockToken}`,
      },
    });
  });

  it('should return "Invalid login credentials" if the first API call fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const credentials = { username: 'testuser', password: 'password123' };
    const result = await authService.login(credentials);

    expect(result).toBe('Invalid login credentials');
    expect(fetchMock).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  });

  it('should return "Invalid login credentials" if the token is missing', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const credentials = { username: 'testuser', password: 'password123' };
    const result = await authService.login(credentials);

    expect(result).toBe('Invalid login credentials');
  });

  it('should return "Failed to login" if the second API call fails', async () => {
    const mockToken = 'mocked-token';

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    } as Response);

    fetchMock.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const credentials = { username: 'testuser', password: 'password123' };
    const result = await authService.login(credentials);

    expect(result).toBe('Failed to login');
  });

  it('should return "Failed to login" if user data is missing', async () => {
    const mockToken = 'mocked-token';

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    } as Response);

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    } as Response);

    const credentials = { username: 'testuser', password: 'password123' };
    const result = await authService.login(credentials);

    expect(result).toBe('Failed to login');
  });

  it('should handle network errors for the first API call', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    const credentials = { username: 'testuser', password: 'password123' };
    await expect(authService.login(credentials)).rejects.toThrow('Network error');
  });

  it('should handle network errors for the second API call', async () => {
    const mockToken = 'mocked-token';

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    } as Response);

    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    const credentials = { username: 'testuser', password: 'password123' };
    await expect(authService.login(credentials)).rejects.toThrow('Network error');
  });
});