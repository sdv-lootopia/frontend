'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateHuntPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle chasse :', { title, description });
    router.push('/');
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Créer une chasse au trésor</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label>
          Titre :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: 8 }}
          />
        </label>

        <label>
          Description :
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: 8 }}
          />
        </label>

        <button type="submit">Créer</button>
      </form>
    </main>
  );
}
