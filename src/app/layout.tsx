import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderRedux from "@/redux/reducer/ProviderRedux";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo app",
  description: "Todo app by next type",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderRedux>{children}</ProviderRedux>
      </body>
    </html>
  );
}
