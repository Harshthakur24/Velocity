import "./globals.css";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = {
  title: "Velocity",
  description:
    "Velocity is an innovative platform designed to be the ultimate hub for students seeking academic resources and community engagement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="Violet"
          enableSystem
          themes={["light", "dark", "Violet", "Blue", "Rose"]}
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
