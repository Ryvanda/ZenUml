import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Github, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from '../lib/axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleGoogleCallback(code);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleCallback = async (code) => {
    setLoading(true);
    try {
      const response = await axios.get(`/auth/google/callback?code=${code}`);
      if (response.data.access_token) {
        await login(response.data.access_token);
      }
    } catch (err) {
      setError('Failed to authenticate with Google. Please try again.');
      console.error('Google callback error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/auth/google');
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError('Failed to initiate Google login. Please try again.');
      console.error('Google login error:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ZenUML</h1>
            <p className="text-gray-600">Create beautiful UML diagrams</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-5 h-5 mr-2 text-red-500" />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>

            <button
              disabled={true}
              className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors opacity-50 cursor-not-allowed"
              title="Coming soon"
            >
              <Github className="w-5 h-5 mr-2 text-gray-700" />
              <span className="text-gray-700 font-medium">Sign in with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                disabled={true}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Coming soon</p>
            </div>

            <button
              type="button"
              disabled={true}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Continue with Email
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-4">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-white bg-opacity-80 rounded-lg shadow">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Demo:</span> Currently only Google OAuth is available. Email/password and GitHub login coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
