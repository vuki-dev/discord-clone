import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Run by NEXT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        font.className,
        "bg-white dark:bg-[#313338]"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="discord-theme"
        >
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
