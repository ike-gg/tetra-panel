import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Tetra Panel",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  twitter: {
    card: "summary_large_image",
  },
  themeColor: "#000000",
  authors: [{ name: "ike", url: "https://github.com/ike-gg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,300&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/monument-extended"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/gg-sans-2"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans ${GeistSans.className} bg-neutral-50`}>
        <TRPCReactProvider headers={headers()}>
          {children}
          <Toaster
            duration={30 * 1000}
            richColors
            visibleToasts={5}
            closeButton
          />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
