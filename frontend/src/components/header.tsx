export default function Header() {
  return (
    <header className="font-worksans bg-licorice flex flex-col items-center justify-center p-3.5 text-3xl tracking-wider select-none">
      <h1>
        <span style={{ color: "var(--color-raspberry)" }}>Disaster</span>
        <span style={{ color: "var(--color-papaya)" }}>Watch</span>
        <span>👀</span>
      </h1>
      <h2
        className="mt-1.5 font-sans text-base tracking-normal"
        style={{ color: "var(--color-french-gray)" }}
      >
        For Neighbors, by Neighbors
      </h2>
    </header>
  );
}
