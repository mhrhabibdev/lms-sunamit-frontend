import { LoginFrom } from '@/components/Auth/Login/Login';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-md space-y-6 p-6 rounded-xl shadow-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
        {/* Heading Section */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            Welcome Back
          </h1>
          <h2 className="text-3xl font-bold text-primary">
            Sign In to Your Account
          </h2>
          <p className="text-sm text-muted-foreground">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form Section */}
        <div className='flex items-center justify-center'>
          <LoginFrom />
        </div>
      </div>
    </div>
  );
}
