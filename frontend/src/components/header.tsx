export default function Header() {
  return (
    <header className="flex items-center justify-center mb-4 text-3xl font-worksans tracking-wider flex-col bg-licorice p-3.5">
      <h1>
        <span style={{ color: 'var(--color-raspberry)' }}>Disaster</span>
        <span style={{ color: 'var(--color-papaya)' }}>Watch</span>
        <span>👀</span>
      </h1>
      <h2 className="text-base font-sans tracking-normal mt-1.5" style={{ color: 'var(--color-french-gray)' }}>
        By Neighbors, for Neighbors
      </h2>
    </header>
  );
}