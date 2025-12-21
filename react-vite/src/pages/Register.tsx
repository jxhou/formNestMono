import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevents the default form submission (page reload)
    // Add your registration logic here
    // For example, check if passwords match and then send data to an API
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Registering with:', { email, password });
    // Example: await api.register({ email, password });
    const response = await register( {username: email, password});
    console.log(response);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email" id="email" name="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" id="password" name="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" required
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;