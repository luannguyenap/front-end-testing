export type UserInput = {
  username: string;
  email: string;
  password: string;
}

export function validateUserInput(input: UserInput): true | string[] {
  const { username, email, password } = input;

  const errors: string[] = [];

  const trimmedUsername = username.trim();
  if (!trimmedUsername) {
    errors.push('Username is required');
  } else if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
    errors.push('Username must be between 3 and 20 characters');
  }

  if (!email) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push('Email is invalid');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6 || password.length > 40) {
    errors.push('Password must be between 6 and 40 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  return errors.length > 0 ? errors : true;
}
