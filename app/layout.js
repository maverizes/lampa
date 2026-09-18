import "./globals.css";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import NavBar from "./components/NavBar/NavBar";
import { Providers } from "./providers";
import Footer from "./components/Footer/Footer";
import { WishlistProvider } from "./context/WishlistContext";
import PreloaderWrapper from "./components/PreloaderWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <PreloaderWrapper />
        <Providers>
          <WishlistProvider>
            <NavBar />
            <RegisterModal />
            {children}
            <Footer />
          </WishlistProvider>
        </Providers>
      </body>
    </html>
  );
}
