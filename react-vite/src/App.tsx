import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the new component

const Home = () => (
  <div className="container mx-auto mt-10">
    <h1 className="text-4xl text-center">Welcome to the Survey Application</h1>
  </div>
);

function App() {
  return (
    // AuthProvider must wrap everything that needs access to auth context,
    // including the Navbar and all routes that might use useAuth or ProtectedRoute.
    // The BrowserRouter (from main.tsx) should be the outermost wrapper for routing to work.
    // The current setup in main.tsx and App.tsx is correct:
    // <BrowserRouter>
    //   <App /> (which contains AuthProvider and Routes)
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/*}
          <Route path="/" element={<Home />} />
          */}
          <Route 
            path="/" 
            element={<ProtectedRoute><Home /></ProtectedRoute>} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Example of a protected route 
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
          />
          */}
        </Routes>
      </AuthProvider>
     
    </div>
  );
}

export default App;