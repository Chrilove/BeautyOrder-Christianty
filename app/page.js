'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Attempt to sign in with credentials
    const res = await signIn('credentials', {
      redirect: false, // Don't automatically redirect
      username,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      setError(null);
      // Redirect to the dashboard on successful login
      router.push('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-content">
          <h2 className="text-center text-white">Login to Admin Dashboard</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-white">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
