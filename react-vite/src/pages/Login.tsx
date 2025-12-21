import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, type AuthCredentials } from '../services/authService';
import { useAuth } from '../AuthContext';


const Login = () => {
  const [credentials, setCredentials] = useState<AuthCredentials>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuth, login } = useAuth();

  if (isAuth) {
    navigate('/');
    return null;
  }


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!credentials.username || !credentials.password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiLogin(credentials);
      // For now, we'll just log the token and redirect.
      // Later, we'll store this in context.

      console.log('Login successful, token:', data.access_token);
      // localStorage.setItem('token', data.accessToken); // Example: storing token
      login();
      
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="mt-4 text-center text-red-600 bg-red-100 p-2 rounded-md">{error}</div>}
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email" name="username" value={credentials.username} onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" required />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" required />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" disabled={isLoading}
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-300">
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;