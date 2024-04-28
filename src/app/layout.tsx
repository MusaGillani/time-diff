import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/state/provider";
import { Toaster } from "sonner";
import { orbitron } from "@/font";

export const metadata: Metadata = {
  title: "Time Diff",
  description: "Time difference calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <StoreProvider>{children}</StoreProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
