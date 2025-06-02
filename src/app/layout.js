'use client';

import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {TestProvider} from "@/contexts/testContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className="container py-3">
              <Header />
                <main>
                    <TestProvider>
                        {children}
                    </TestProvider>
                </main>
              <Footer />
          </div>
      </body>
    </html>
  );
}
