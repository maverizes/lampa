import "./globals.css";
import RegisterModal from "./components/RegisterModal/page";
import NavBar from "./components/NavBar/page";
import { Providers } from "./providers";
import Footer from "./components/Footer/page";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({ children }) {
  const messages = await getMessages();

  return (
    <html lang="ru">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NavBar />
            <RegisterModal />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
