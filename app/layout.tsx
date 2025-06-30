import "./globals.css";
import {inter} from '@/app/components/font'
import { AuthProvider } from "./Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased overflow-hidden`}
      >
        <ToastContainer />
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
