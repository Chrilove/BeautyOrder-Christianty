// app/login/page.js (optimized version with image preloading)
'use client'
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BackgroundImage from '../components/BackgroundImage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Attempt to sign in with credentials
      const res = await signIn('credentials', {
        redirect: false, // Don't automatically redirect
        username,
        password,
      });

      if (res?.error) {
        setError('Username atau password salah');
      } else {
        setError(null);
        // Redirect to the dashboard on successful login
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan sistem. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking session
  if (status === 'loading') {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="login-container">
      <BackgroundImage />
      <div className="login-content">
        <h2 className="text-center text-white">Login to Admin Dashboard</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}