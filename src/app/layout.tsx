import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { LayoutProps } from "~/types/global";

export const metadata = {
  title: "Cluster App",
  description: "Welcome!",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
