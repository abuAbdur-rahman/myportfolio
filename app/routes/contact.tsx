import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-24">
        <p className="text-[var(--text-secondary)]">Contact — Phase 2 content goes here.</p>
      </main>
      <Footer />
    </>
  );
}
