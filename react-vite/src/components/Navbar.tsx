import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  // Consume the authentication state and logout function from the context.
  const { isAuth, logout } = useAuth();

  // // This effect will re-check authentication status when the user navigates.
  // useEffect(() => {
  //   const handleAuthChange = () => {
  //     setIsAuth(isAuthenticated());
  //   };

  //   window.addEventListener('authChange', handleAuthChange);

  //   return () => {
  //     window.removeEventListener('authChange', handleAuthChange);
  //   };
  // }, []);

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          SurveyApp
        </Link>
        {isAuth ? (
          <button onClick={logout} className="text-gray-300 hover:text-white">Logout</button>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;