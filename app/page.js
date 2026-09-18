import ScrollBackground from "./components/ScrollBackground";
import ScrollSection from "./components/ScrollSection";
import Hero from "./components/Hero/Hero";
import Ab from "./components/About/About";
import Categories from "./components/Categories/Categories";
import News from "./components/News/News";
import Portfolio from "./components/Portfolio/Portfolio";
export default function Home() {
  return (
    <ScrollBackground>
      <main className="min-h-screen">
        <ScrollSection>
          <Hero />
        </ScrollSection>
        <ScrollSection>
          <Ab />
        </ScrollSection>
        <ScrollSection>
          <Categories />
        </ScrollSection>
        <ScrollSection>
          <Portfolio />
        </ScrollSection>
        <ScrollSection>
          <News />
        </ScrollSection>
      </main>
    </ScrollBackground>
  );
}
