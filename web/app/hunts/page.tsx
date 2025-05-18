'use client';

import Link from 'next/link';

const mockHunts = [
  { id: '1', title: 'Chasse à Paris', description: 'Explore Montmartre.' },
  { id: '2', title: 'Aventure à Dakar', description: 'Découvre la Médina.' },
  { id: '3', title: 'Mission Jungle', description: 'Énigmes en forêt.' },
];

export default function HuntsPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h1>Liste des Chasses</h1>

      {mockHunts.map((hunt) => (
        <div
          key={hunt.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <h2>{hunt.title}</h2>
          <p>{hunt.description}</p>
          <Link href={`/hunts/${hunt.id}`} style={{ color: 'blue' }}>
            Voir les détails →
          </Link>
        </div>
      ))}
    </main>
  );
}
