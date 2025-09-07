import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeliveryApp - Seu delivery favorito",
  description: "O melhor aplicativo de delivery da sua cidade. Peça comida dos seus restaurantes favoritos com rapidez e praticidade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
            <Toaster position="top-center" richColors />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}