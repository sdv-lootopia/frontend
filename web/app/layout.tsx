import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { CrownBalanceProvider } from "@/contexts/crown-balance-context";
import { InventoryProvider } from "@/contexts/inventory-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CrownBalanceProvider>
          <InventoryProvider>
            <CartProvider>{children}</CartProvider>
          </InventoryProvider>
        </CrownBalanceProvider>
      </body>
    </html>
  );
}
