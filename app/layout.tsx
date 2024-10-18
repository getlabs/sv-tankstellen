import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SV Tankstellen Verzeichnis",
  description: "Finde die besten Tankstellen in Köln und Umgebung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "url('images/bg-header.png')",
          backgroundSize: "100% 100%",
        }}
        className="h-screen bg-no-repeat bg-cover bg-center flex flex-col "
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
