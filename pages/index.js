import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1>Spy Cat Agency Dashboard</h1>
      <p>Manage your spy cats below:</p>
      <Link href="/cats" className="btn btn-primary">
        Go to Spy Cats Management
      </Link>
    </div>
  );
}
