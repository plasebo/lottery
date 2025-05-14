import React from 'react';
import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export function Login() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-200px)] py-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </section>
    </Layout>
  );
}