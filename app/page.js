import Hero from "./components/Hero/page";
import About from "./components/About/page";
import Categories from "./components/Categories/page";
import News from "./components/News/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Categories />
      <News />
    </main>
  );
}
