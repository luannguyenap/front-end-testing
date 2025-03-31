import { validateUserInput, UserInput } from '../utils/3.input';
describe('validateUserInput', () => {
  it('should return true for valid input', () => {
    const input: UserInput = {
      username: 'validUser',
      email: 'user@example.com',
      password: 'ValidPassword123',
    };
    expect(validateUserInput(input)).toBe(true);
  });

  describe('username validation', () => {
    it('should return error if username is empty', () => {
      const input: UserInput = {
        username: '   ',
        email: 'user@example.com',
        password: 'ValidPassword123',
      };
      expect(validateUserInput(input)).toEqual(['Username is required']);
    });

    it('should return error if username is less than 3 characters', () => {
      const input: UserInput = {
        username: 'ab',
        email: 'user@example.com',
        password: 'ValidPassword123',
      };
      expect(validateUserInput(input)).toEqual(['Username must be between 3 and 20 characters']);
    });

    it('should return error if username is more than 20 characters', () => {
      const input: UserInput = {
        username: 'a'.repeat(21),
        email: 'user@example.com',
        password: 'ValidPassword123',
      };
      expect(validateUserInput(input)).toEqual(['Username must be between 3 and 20 characters']);
    });
  });

  describe('email validation', () => {
    it('should return error if email is empty', () => {
      const input: UserInput = {
        username: 'validUser',
        email: '',
        password: 'ValidPassword123',
      };
      expect(validateUserInput(input)).toEqual(['Email is required']);
    });

    it('should return error if email is invalid', () => {
      const input: UserInput = {
        username: 'validUser',
        email: 'invalid-email',
        password: 'ValidPassword123',
      };
      expect(validateUserInput(input)).toEqual(['Email is invalid']);
    });
  });

  describe('password validation', () => {
    it('should return error if password is empty', () => {
      const input: UserInput = {
        username: 'validUser',
        email: 'user@example.com',
        password: '',
      };
      expect(validateUserInput(input)).toEqual(['Password is required']);
    });

    it('should return error if password is less than 6 characters', () => {
      const input: UserInput = {
        username: 'validUser',
        email: 'user@example.com',
        password: 'Abc1',
      };
      expect(validateUserInput(input)).toEqual(['Password must be between 6 and 40 characters']);
    });

    it('should return error if password is more than 40 characters', () => {
      const input: UserInput = {
        username: 'validUser',
        email: 'user@example.com',
        password: 'A'.repeat(41),
      };
      expect(validateUserInput(input)).toEqual(['Password must be between 6 and 40 characters']);
    });

    it('should return error if password does not contain an uppercase letter', () => {
      const input: UserInput = {
        username: 'validUser',
        email: 'user@example.com',
        password: 'lowercasepassword123',
      };
      expect(validateUserInput(input)).toEqual(['Password must contain at least one uppercase letter']);
    });
  });

  it('should return multiple errors if multiple fields are invalid', () => {
    const input: UserInput = {
      username: 'ab',
      email: 'invalid-email',
      password: 'short',
    };
    expect(validateUserInput(input)).toEqual([
      'Username must be between 3 and 20 characters',
      'Email is invalid',
      'Password must be between 6 and 40 characters',
      'Password must contain at least one uppercase letter',
    ]);
  });
});