import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "./ApolloWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Book Management System",
  description: "A simple book management system built with Next.js and MUI",
  keywords: "books, management, system",
  icons: {
    icon: "https://tse1.mm.bing.net/th/id/OIP.s6qkxOqsGKB_7JnvbKujWAHaE2?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
