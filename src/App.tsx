import Navbar from "./components/Navbar";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </main>
      <Contact />
    </>
  );
}

export default App;