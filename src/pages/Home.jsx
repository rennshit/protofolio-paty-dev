import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Team from "../sections/Team";
import Projects from "../sections/Projects";
import Proof from "../sections/Proof";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Projects />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
