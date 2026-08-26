import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import Products from "./components/sections/Products";
import Installment from "./components/sections/Installment";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <div dir="rtl" style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "Vazirmatn, sans-serif" }}>
      <Header />
      <Hero />
      <Features />
      <Products />
      <Installment />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
