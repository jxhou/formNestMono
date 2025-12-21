import { dispatchAuthChangeEvent } from "./authEvents";
// Define the base URL of your NestJS backend.
// Make sure this matches the port your backend is running on.
const TOKEN_KEY = 'accessToken';
const API_URL = 'http://localhost:3000/auth';

/**
 * Interfaces for type safety
 */
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  // You might also get user info back from the login/register endpoints
  // user: { id: string; email: string; };
}

/**
 * A helper function to handle API responses.
 * It throws an error if the response is not 'ok'.
 * @param response - The fetch Response object
 */
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

/**
 * Registers a new user.
 * @param credentials - The user's email and password.
 */
export const register = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data: AuthResponse = await handleResponse(response);

  if ( data.access_token) {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    dispatchAuthChangeEvent();
  }
  
  return data;
};

/**
 * Logs in a user.
 * @param credentials - The user's email and password.
 */
export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data: AuthResponse = await handleResponse(response);
  if (data.access_token) {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    dispatchAuthChangeEvent();
  }
  return data;
};

/**
 * Logs out the current user by removing the token from localStorage.
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  dispatchAuthChangeEvent();
};

/**
 * Checks if a user is currently authenticated.
 * @returns true if a token exists, false otherwise.
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};