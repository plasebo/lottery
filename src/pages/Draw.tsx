import React from 'react';
import { Layout } from '../components/Layout';
import { DrawMachine } from '../components/DrawMachine';

export function Draw() {
  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <DrawMachine />
      </section>
    </Layout>
  );
}