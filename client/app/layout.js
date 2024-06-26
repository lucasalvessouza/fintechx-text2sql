import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Nav from '../components/Nav'
import { ContextProvider } from "@/context/state";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinTechX",
  description: "A text2sql FinTechX application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
           <ContextProvider>
              <Nav />
              <div className="bg-gray-700 w-full p-[10px] md:p-[50px]">
                  {children}
              </div>
           </ContextProvider>
        </div>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: '#9fd786',
              },
            },
            error: {
              style: {
                background: '#fbaaaa',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
